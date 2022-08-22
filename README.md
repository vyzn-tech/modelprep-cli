# modelprep-cli

modelprep-cli is a TypeScript commandline-tool which allows preparing data for import into the vyzn platform.

The goal of the tool is to automate manual work that has been required in order to onboard customers and projects onto the platform. Also it serves as a playground for prototyping before real solutions are being implemented within the platform.

## Installation

Use the package runner [npx](https://github.com/npm/npm/releases/tag/v5.2.0) to or node to execute modelprep-cli.

```
# Run using NPX
npx @vyzn-tech/modelprep-cli@latest --help 

# Run using node
npm install
npm i -g tsc
npx tsc
node dist/main.js --help
```

## Usage

```
$ npx @vyzn-tech/modelprep-cli --help
Usage: modelprep-cli [options]

Prepare a model for upload into the vyzn platform.

Options:
  -r, --refmodel <path>         path to the reference model file (.xlsx)
  -m, --merge <path>            path of the file to merge into the output file (.csv)
  -p, --products <path>         path of the products mapping file (.csv)
  -g, --globaloverrides <path>  path of the global overrides file (.csv)
  -s, --shadingfactors <path>   path of the shading-factors file (.csv)
  -o, --output <path>           path to the output file (.csv)
  -f, --force                   force overwrite existing file
  -V, --version                 output the version number
  -h, --help                    display help for command
```
## Example

```
# Initially you can pass in reference model file (.xlsx) and the tool will create empty templates for the remaining files for you:
#
# - merge_v2.csv (empty template)
# - products_mapping_v2.csv (empty template)
# - overrides_v2.csv (empty template)
# - shading_factors_v2.csv (empty template)

$ npx @vyzn-tech/modelprep-cli -r example/RefModel_Unteraegeri_B1B2_V1.xlsx -m merge_v2.csv -p products_mapping_v2.csv -g overrides_v2.csv -s shading_factors_v2.csv -o output.csv -f

# Once the templates have been created you can fill them out and re-run the command to create another output.csv

```

## Expected Input

### Reference Model File (.xlsx)

A file containing the output of the Reference Model Algorithm V2. See [example](example/RefModel_Unteraegeri_B1B2_V1.xlsx).

### Merge File (.csv)

A file containing rows that should be merged into the final result at the very top of the file. See [example](example/merge.csv).

### Products Mapping File (.csv)

A file containing the mapping of source products to target products. See [example](example/products_mapping.csv).

### Global Overrides File (.csv)

A file containing properties that should be set on all rows in the final result (except Merge File). See [example](example/overrides.csv).

### Shading Factors File (.csv)

A file containing the shading factors to apply to elements like Windows. See [example](example/shading_factors.csv).

## Expected Output

The tool will generate a consolidated file that can be imported into the vyzn platform. See [example](test_assets/test_actual_output.csv).

## Testing

```
# Run automated tests with jest
npm test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to contribute.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
