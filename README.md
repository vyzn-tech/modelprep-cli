# modelprep-cli

modelprep-cli is a TypeScript commandline-tool which allows preparing data for import into the vyzn platform.

## Usage

Use the package runner [npx](https://github.com/npm/npm/releases/tag/v5.2.0) to or node to execute modelprep-cli.

```bash
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

```bash
# Run using NPX
npx @vyzn-tech/modelprep-cli@latest --help 

# Run using node
npm install
npm i -g tsc
npx tsc
node dist/main.js --help
```

## Expected Input

TODO

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)