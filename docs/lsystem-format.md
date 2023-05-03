# L-System YAML Format

This document describes the YAML format for defining L-system grammars. L-systems are a type of formal grammar used to model the growth and development of biological organisms, as well as to generate complex fractal patterns in computer graphics and art.

## Basic Structure

An L-system grammar definition consists of several fields:

`name` (optional): A short, human-readable name for the grammar.
`description` (optional): A longer description of what the grammar represents or generates.
`axiom`: The starting string for the grammar.
`rules`: A list of rules that specify how to transform symbols in the grammar.
`angle` (optional): The angle in degrees for turning the turtle graphics.

## Example:

Here's an example L-system grammar definition in YAML format:

```yaml
name: Sierpinski Triangle
description: A fractal pattern resembling a triangle
axiom: A
rules:
  A: B-A-B
  B: A+B+A
angle: 60
```
In this example, the L-system grammar is named "Sierpinski Triangle" and has a description that describes it as a fractal pattern resembling a triangle. The axiom is the starting string for the grammar, and the rules specify how to transform symbols in the grammar. The angle field specifies the turning angle for the turtle graphics, and the iterations field specifies how many times to apply the grammar.

## Rules

Each rule in the rules list consists of a left-hand side (LHS) and a right-hand side (RHS), separated by a colon :. The LHS should be a single character, and the RHS should be a string of one or more characters.

For example, the rule A: B-A-B means that every occurrence of the symbol A in the grammar should be replaced by the string B-A-B.
