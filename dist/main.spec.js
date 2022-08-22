import path from 'path';
import { exec } from 'child_process';
import { promises as fs, default as fssync } from 'fs';
import { parseCSV } from 'csv-load-sync';
test('prep model', async () => {
    let result = await cli([
        "-r", "example/RefModel_Unteraegeri_B1B2_V1.xlsx",
        "-m", "example/merge.csv",
        "-p", "example/products_mapping.csv",
        "-g", "example/overrides.csv",
        "-s", "example/shading_factors.csv",
        "-o", "test_assets/test_actual_output.csv",
        "-f"
    ], '.');
    expect(result.code).toBe(0);
    expect(fssync.existsSync('test_actual_output.csv')).toBe(true);
});
function cli(args, cwd) {
    return new Promise(resolve => {
        exec(`node ${path.resolve('./dist/main.js')} ${args.join(' ')}`, { cwd }, (error, stdout, stderr) => {
            if (error)
                console.error(error);
            if (stderr)
                console.error(stderr);
            if (stdout)
                console.info(stdout);
            resolve({
                code: error && error.code ? error.code : 0,
                error,
                stdout,
                stderr
            });
        });
    });
}
async function readCsv(path) {
    const raw = await fs.readFile(path, { encoding: 'utf8', flag: 'r' });
    return parseCSV(raw);
}
//# sourceMappingURL=main.spec.js.map