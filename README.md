# Nextra Documentation Generator

A simple web tool to generate folder structures and MDX files for Nextra-based documentation sites.

## Live Demo

🚀 [Try it here](https://dharanigowthamsampath.github.io/Nextra-File-Generator)

## Features

- Generate folder structures for Nextra documentation
- Create MDX files automatically
- Generate \_meta.js files for navigation
- Support for section separators
- Downloadable ZIP file with complete structure
- Live preview of the generated structure

## Usage

1. Visit the [live demo](https://dharanigowthamsampath.github.io/Nextra-File-Generator)
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

## Special Features

- Use "--" prefix for section separators in your navigation
- Support for nested folder paths (e.g., "docs/guide")
- Automatic \_meta.js generation for each folder
- Clean MDX files created for each page
- Modern, responsive web interface

## Local Development

1. Clone this repository

```bash
git clone https://github.com/dharanigowthamsampath/Nextra-File-Generator.git
```

2. Open index.html in your browser
3. Start creating documentation structures!

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

MIT License
