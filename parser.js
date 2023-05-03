#!/usr/bin/env node

/**
 * Command line utility to parse L-system grammars from YAML to JSON and validate them.
 *
 * Usage:
 *   parser.js [-o <outputFile>] <inputFile>
 *
 * Options:
 *   -o, --output <outputFile>  output file name
 *
 * Arguments:
 *   inputFile                   input file name (required)
 *
 * Examples:
 *   parser.js grammar.yaml                    # parse grammar.yaml to console
 *   parser.js -o grammar.json grammar.yaml    # parse grammar.yaml to grammar.json
 */


const yaml = require('js-yaml');
const fs = require('fs');
const { Command } = require('commander');

// Define a function to validate the grammar object
function validateGrammar(grammar) {
    // Check for required fields
    if (!grammar.axiom) {
        throw new Error('Axiom is required');
    }
    if (!grammar.rules || grammar.rules.length === 0) {
        throw new Error('At least one rule is required');
    }

    // Check the format of the rules
    const ruleLHS = new Set();
    for (const rule of grammar.rules) {
        if (typeof rule.lhs !== 'string' || rule.lhs.length !== 1) {
            throw new Error('Invalid rule LHS: ' + rule.lhs);
        }
        if (typeof rule.rhs !== 'string' || rule.rhs.length === 0) {
            throw new Error('Invalid rule RHS: ' + rule.rhs);
        }
        if (ruleLHS.has(rule.lhs)) {
            throw new Error('Duplicate rule LHS: ' + rule.lhs);
        }
        ruleLHS.add(rule.lhs);
    }

    // Check optional fields
    if (grammar.angle !== undefined && (typeof grammar.angle !== 'number' || grammar.angle < 0)) {
        throw new Error('Invalid angle: ' + grammar.angle);
    }

    // The grammar is valid
    return true;
}

function parseGrammar(yamlString) {
    try {
      // Parse the YAML string
      const doc = yamlString;
  
      // Convert the YAML data to JSON format
      const grammar = {
        name: doc.name || '',
        description: doc.description || '',
        axiom: doc.axiom,
        rules: [],
        angle: doc.angle || 0,
      };
  
      // Parse the rules and add them to the grammar object
      for (const key in doc.rules) {
        grammar.rules.push({ lhs: key, rhs: doc.rules[key] });
      }
  
      // Validate the grammar object
      validateGrammar(grammar);
  
      // Encode the grammar object as a formatted JSON string
      const jsonString = JSON.stringify(grammar, null, 2);
  
      return jsonString;
    } catch (error) {
      throw new Error('Error parsing grammar: ' + error.message);
    }
  }

// Set up the command line arguments
const program = new Command();
program
    .arguments('<inputFile>')
    .option('-o, --output <outputFile>', 'output file name')
    .action((inputFile, options) => {
        try {
            // Read the YAML file
            const doc = yaml.load(fs.readFileSync(inputFile, 'utf8'));

            const jsonString = parseGrammar(doc);

            // Write the JSON string to the output file if specified
            if (options.output) {
                fs.writeFileSync(options.output, jsonString);
            } else {
                console.log(jsonString);
            }
        } catch (error) {
            console.error(error.message);
            process.exit(1);
        }
    });

// Parse the command line arguments
program.parse(process.argv);
