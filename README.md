# Nextra Documentation Generator

A simple web tool to generate folder structures and MDX files for Nextra-based documentation sites.

## Features

- Generate folder structures for Nextra documentation
- Create MDX files automatically
- Generate \_meta.js files for navigation
- Support for section separators
- Downloadable ZIP file with complete structure

## Usage

1. Open the web application
2. Enter your documentation structure in JSON format
3. Click "Create & Download Zip" button
4. Extract the downloaded ZIP file into your Nextra project's pages directory

## JSON Structure Example

```json
{
  "C": ["--Getting Started", "index", "why_c", "history"],
  "C/operators": [
    "--Basic Operators",
    "c_arithmetic_operators",
    "c_relational_operators"
  ]
}
```

## Local Development

1. Clone this repository
2. Open index.html in your browser
3. Start creating documentation structures!

## License

MIT License
