# L-System Parser

This is a command-line utility for parsing L-system grammars from YAML to JSON and validating them.

## Requirements

- Node.js v12 or higher

## Installation

1. Clone this repository or download the ZIP archive.
2. Open a terminal in the `lsystem-parser` directory.
3. Run `npm install` to install the required dependencies.

## Usage

```
parser.js [-o <outputFile>] <inputFile>
```

- `<inputFile>`: The name of the input file in YAML format.
- `-o, --output <outputFile>`: Optional parameter to specify the output file name.
- `<outputFile>`: The name of the output file in JSON format.

If no output file is specified, the JSON output is printed to the console.

## Examples

```
parser.js grammar.yaml
```

Parses `grammar.yaml` and outputs the corresponding JSON object to the console.

```
parser.js -o grammar.json grammar.yaml
```

Parses `grammar.yaml` and writes the corresponding JSON object to `grammar.json`.

## Grammar Format

An L-system grammar definition consists of several fields:

- `name` (optional): A short, human-readable name for the grammar.
- `description` (optional): A longer description of what the grammar represents or generates.
- `axiom`: The starting string for the grammar.
- `rules`: A list of rules that specify how to transform symbols in the grammar.
- `angle` (optional): The angle in degrees for turning the turtle graphics.

For more information on the L-system grammar format, see the [L-System YAML Format](docs/lsystem-format.md).

## Validation

The program includes a `validateGrammar` function to validate an L-system grammar object. The grammar object is validated to ensure that it conforms to the L-system grammar definition, and if it is valid, it is encoded as a formatted JSON string.
