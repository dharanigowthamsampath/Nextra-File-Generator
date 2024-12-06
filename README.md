# Nextra Documentation Generator

A tool to generate structured documentation for Nextra-based sites, with support for deep hierarchies and organized navigation.

## Live Demo

🚀 [Try it here](https://dharanigowthamsampath.github.io/Nextra-File-Generator)

## Why This Tool?

I created this tool while building [developerdocs.in](https://developerdocs.in) - a comprehensive documentation site for multiple programming languages. Creating the folder structure and \_meta.js files manually became tedious, especially for extensive documentation. This tool automates that process.

## Features

- Generate complete Nextra documentation structure
- Support for deep nested hierarchies
- Automatic \_meta.js generation
- Section titles as folder keys
- MDX file generation with proper naming
- Downloadable ZIP with complete structure

## JSON Structure Example

```json
{
  "C++ Programming": {
    "Basics of C++": {
      "Introduction": {
        "--Overview": [
          "What is C++?",
          "Key Features of C++",
          "Applications of C++"
        ],
        "--Setting Up": [
          "Installing IDE (Code::Blocks, Visual Studio)",
          "Writing the First Program"
        ]
      },
      "Basic Syntax": {
        "--Hello World": [
          "Writing Your First Program",
          "Compiling and Running"
        ],
        "--Program Structure": ["Main Function", "Headers and Preprocessors"]
      }
    }
  }
}
```

This will generate:

```
📁 pages
└── 📁 C++ Programming
    └── 📁 Basics of C++
        ├── 📁 Introduction
        │   ├── 📄 _meta.js
        │   ├── 📄 what-is-cpp.mdx
        │   ├── 📄 key-features-of-cpp.mdx
        │   └── 📄 applications-of-cpp.mdx
        └── 📁 Basic Syntax
            ├── 📄 _meta.js
            ├── 📄 writing-your-first-program.mdx
            ├── 📄 compiling-and-running.mdx
            └── 📄 main-function.mdx
```

## Key Features

1. **Section Titles in Keys**

   - Use "--" prefix in keys to mark section titles
   - Example: `"--Overview": ["What is C++?", ...]`

2. **Automatic \_meta.js Generation**

   ```javascript
   // Example _meta.js
   const meta = {
     Overview: {
       title: "Overview",
       type: "separator",
     },
     "what-is-cpp": "What is C++?",
     "key-features-of-cpp": "Key Features of C++",
   };
   ```

3. **MDX File Generation**
   - Files are created based on the array items
   - Names are automatically slugified
   - Content includes the original title

## Usage

1. Visit the [live demo](https://dharanigowthamsampath.github.io/Nextra-File-Generator)
2. Enter your documentation structure following the JSON format above
3. Click "Create & Download Zip"
4. Extract the ZIP into your Nextra project's pages directory

## Local Development

1. Clone this repository

```bash
git clone https://github.com/dharanigowthamsampath/Nextra-File-Generator.git
```

2. Open index.html in your browser
3. Start creating documentation structures!

## Contributing

This tool is actively being developed. Contributions are welcome!

- 🐛 Found a bug? Open an issue
- 💡 Have an idea? Share it in discussions
- 🔧 Want to contribute? Submit a PR

## License

MIT License

---

Created for the Nextra community by [Dharani Gowtham](https://github.com/dharanigowthamsampath)
