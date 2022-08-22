# acoustic-rating-cli

modelprep is a TypeScript commandline-tool which allows preparing data for import into the vyzn platform.

## Usage

Use the package runner [npx](https://github.com/npm/npm/releases/tag/v5.2.0) to execute modelprep.

```bash
$ npx @vyzn-tech/modelprep --help
Prepare a model for upload into the vyzn platform.
Usage: main [options]

modelprep

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

```bash
# Run using NPX
npx @vyzn-tech/modelprep@latest -r example/RefModel_Unteraegeri_B1B2_V1.xlsx -m example/merge.csv -p example/products_mapping.csv -g example/overrides.csv -s example/shading_factors.csv -o output.csv -f

# Run using node
npm install
npm i -g tsc
npx tsc
node node dist/main.js -r example/RefModel_Unteraegeri_B1B2_V1.xlsx -m example/merge.csv -p example/products_mapping.csv -g example/overrides.csv -s example/shading_factors.csv -o output.csv -f
```

## Expected Input

TODO

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)