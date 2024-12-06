# Nextra Documentation Generator

A simple web tool to generate folder structures and MDX files for Nextra-based documentation sites.

## Live Demo

🚀 [Try it here](https://dharanigowthamsampath.github.io/Nextra-File-Generator)

## Features

- Generate folder structures for Nextra documentation
- Create MDX files automatically
- Generate \_meta.js files for navigation
- Support for section separators
- Support for unlimited folder depth
- Support for both nested and path-based JSON structures
- Downloadable ZIP file with complete structure
- Live preview of the generated structure

## Usage

1. Visit the [live demo](https://dharanigowthamsampath.github.io/Nextra-File-Generator)
2. Enter your documentation structure in JSON format
3. Click "Create & Download Zip" button
4. Extract the downloaded ZIP file into your Nextra project's pages directory

## JSON Structure Examples

### Nested Structure (Recommended)

```json
{
  "folder1": {
    "folder1.1": ["--Separator Title", "page1", "page2"],
    "folder1.2": {
      "folder1.2.1": ["--Separator Title", "page3", "page4"]
    }
  },
  "folder2": {
    "introduction": ["--Getting Started", "overview", "setup"],
    "advanced": {
      "topics": ["--Advanced", "config", "deployment"]
    }
  }
}
```

### Path-Based Structure (Alternative)

```json
{
  "docs": ["--Getting Started", "index", "introduction"],
  "docs/tutorials": ["--Basics", "setup", "configuration"],
  "docs/tutorials/advanced": ["--Advanced", "deployment", "optimization"]
}
```

## Special Features

- Use "--" prefix for section separators in your navigation
- Support for both nested JSON objects and path-based structures
- Automatic \_meta.js generation for each folder level
- Clean MDX files created for each page
- Modern, responsive web interface

## Folder Structure Output Example

For the nested structure above, it will create:

```
📁 pages
├── 📁 folder1
│   ├── 📁 folder1.1
│   │   ├── 📄 _meta.js
│   │   ├── 📄 page1.mdx
│   │   └── 📄 page2.mdx
│   └── 📁 folder1.2
│       └── 📁 folder1.2.1
│           ├── 📄 _meta.js
│           ├── 📄 page3.mdx
│           └── 📄 page4.mdx
└── 📁 folder2
    ├── 📁 introduction
    │   ├── 📄 _meta.js
    │   ├── 📄 overview.mdx
    │   └── 📄 setup.mdx
    └── 📁 advanced
        └── 📁 topics
            ├── 📄 _meta.js
            ├── 📄 config.mdx
            └── 📄 deployment.mdx
```

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
