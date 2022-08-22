import { program } from 'commander';
import { promises as fs, default as fssync } from 'fs';
import { parseCSV } from 'csv-load-sync';
import * as XLSX from 'xlsx/xlsx.mjs';
import ObjectsToCsv from 'objects-to-csv';
import ProductElement from './ProductElement.js';
import ReferenceModelElement from './ReferenceModelElement.js';
import ModelImportElement from './ModelImportElement.js';
import ShadingFactorsElement from './ShadingFactorsElement.js';
import OverrideElement from './OverrideElement.js';
import { Readable } from 'stream';
async function main() {
    program
        .addHelpText("before", "Prepare a model for upload into the vyzn platform.")
        .requiredOption('-r, --refmodel <path>', 'path to the reference model file (.xlsx)')
        .requiredOption('-m, --merge <path>', 'path of the file to merge into the output file (.csv)')
        .requiredOption('-p, --products <path>', 'path of the products mapping file (.csv)')
        .requiredOption('-g, --globaloverrides <path>', 'path of the global overrides file (.csv)')
        .requiredOption('-s, --shadingfactors <path>', 'path of the shading-factors file (.csv)')
        .requiredOption('-o, --output <path>', 'path to the output file (.csv)')
        .option('-f, --force', 'force overwrite existing file');
    program.version('0.0.1');
    program.description('modelprep');
    program.parse();
    const refmodelPath = program.getOptionValue('refmodel');
    const mergePath = program.getOptionValue('merge');
    const productsPath = program.getOptionValue('products');
    const overridesPath = program.getOptionValue('globaloverrides');
    const shadingfactorsPath = program.getOptionValue('shadingfactors');
    const outputPath = program.getOptionValue('output');
    const force = program.getOptionValue('force');
    if (await fileExists(outputPath) && !force) {
        console.error(`Error: Output file ${outputPath} already exists. Use -f to force overwrite.`);
        process.exit(1);
    }
    const mergeEntries = await readMergeEntries(mergePath);
    const referenceModelElements = await readReferenceModelElements(refmodelPath);
    const productsMapping = await readOrCreateProductMapping(productsPath);
    const mappedModelImportElements = await mapToModelImportElements(referenceModelElements, productsMapping);
    const output = Array();
    output.push(...mergeEntries);
    output.push(...mappedModelImportElements);
    const shadingFactors = await readOrCreateShadingFactors(shadingfactorsPath, output);
    for (const element of output)
        element.fillFromShadingFactors(shadingFactors);
    const overridesCsvRows = await readOrCreateOverrides(overridesPath);
    for (const element of output)
        element.fillFromOverrides(overridesCsvRows);
    await writeCsv(output, outputPath);
    console.info(`File '${outputPath}' successfully written.`);
}
async function readReferenceModelElements(inputPath) {
    XLSX.set_fs(fssync);
    XLSX.stream.set_readable(Readable);
    var inputWorkbook = XLSX.readFile(inputPath, {});
    var rows = XLSX.utils.sheet_to_json(inputWorkbook.Sheets["Data OLD"]);
    return rows.map((row) => {
        var e = new ReferenceModelElement();
        e.fillFromCsvRow(row);
        return e;
    });
}
async function readOrCreateProductMapping(productsPath) {
    const productsMapping = {};
    const productsMappingCsv = await readOrCreateCsv(productsPath, {
        template: [{ Source: "a", Target: "b" }]
    });
    for (const productsMappingCsvRow of productsMappingCsv) {
        productsMapping[productsMappingCsvRow["Source"]] = productsMappingCsvRow["Target"];
    }
    return productsMapping;
}
async function readMergeEntries(mergePath) {
    const results = [];
    const mergeCsvRows = await readOrCreateCsv(mergePath, { template: [
            new ModelImportElement()
        ] });
    for (const row of mergeCsvRows) {
        const modelImportElement = new ModelImportElement();
        modelImportElement.fillFromCsvRow(row);
        results.push(modelImportElement);
    }
    return results;
}
async function mapToModelImportElements(referenceModelElements, productMapping) {
    const results = [];
    for (const referenceModelElement of referenceModelElements) {
        const productElement = new ProductElement();
        productElement.fill(referenceModelElement, productMapping);
        const modelImportElement = new ModelImportElement();
        modelImportElement.fill(referenceModelElement, productElement);
        results.push(modelImportElement);
    }
    return results;
}
async function readOrCreateShadingFactors(shadingfactorsPath, modelImportElements) {
    var template = [];
    for (const modelImportElement of modelImportElements) {
        if (modelImportElement['Element Type'] == "Fenster" && (JSON.parse(modelImportElement.Dämmperimeter) == true)) {
            const shadingFactorsElement = new ShadingFactorsElement();
            shadingFactorsElement.GlobalId = modelImportElement.GlobalId;
            template.push(shadingFactorsElement);
        }
    }
    return await readOrCreateCsv(shadingfactorsPath, { template: template });
}
async function readOrCreateOverrides(overridesPath) {
    return await readOrCreateCsv(overridesPath, { template: [new OverrideElement()] });
}
async function readOrCreateCsv(path, options) {
    try {
        return await readCsv(path);
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            console.warn(`File '${path}' does not exist, creating it from template.`);
            await writeCsv(options.template, path);
            return [];
        }
        else
            throw err;
    }
}
async function readCsv(path) {
    const raw = await fs.readFile(path, { encoding: 'utf8', flag: 'r' });
    return parseCSV(raw);
}
async function writeCsv(obj, path) {
    const outputCsv = await (new ObjectsToCsv(obj)).toString();
    const utf8Bom = '\ufeff';
    await fs.writeFile(path, utf8Bom + outputCsv, { encoding: 'utf8' });
}
async function fileExists(path) {
    return new Promise((resolve, reject) => {
        var result = fssync.existsSync(path);
        resolve(result);
    });
}
main();
//# sourceMappingURL=main.js.map