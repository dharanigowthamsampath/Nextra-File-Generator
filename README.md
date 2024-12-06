# Nextra Documentation Generator

A tool to generate structured documentation for Nextra-based sites, with support for deep hierarchies and organized navigation.

## Live Demo

🚀 [Try it here](https://dharanigowthamsampath.github.io/Nextra-File-Generator)

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
  "Java Documentation": {
    "Java Basics": {
      "--Variables and Data Types": [
        "Variables Overview",
        {
          "Primitive Data Types": ["byte", "short", "int", "long"]
        },
        {
          "Non-Primitive Data Types": ["Strings", "Arrays", "Classes"]
        }
      ]
    }
  }
}
```

## Generating Content with ChatGPT

You can use ChatGPT to generate a comprehensive syllabus in the correct JSON format. Here's the prompt to use:

```text
I need a comprehensive programming syllabus in JSON format. The structure should follow this exact format:

{
  "Language Name": {
    "section_name": {
      "--section_title": [
        "topic1",
        {
          "subtopic_name": [
            "item1",
            "item2",
            "item3"
          ]
        }
      ]
    }
  }
}

Important rules to follow:
1. Use "--" prefix for section titles that act as separators
2. Each topic can have subtopics as nested objects with arrays
3. Keep topic names clear and descriptive
4. Follow a logical learning progression
5. Include all major concepts from basics to advanced

The syllabus should cover:
- Basic concepts and syntax
- Object-Oriented Programming
- Data Structures (if applicable)
- Standard Libraries
- Memory Management
- Advanced Features
- Best Practices
- Common Applications

Please generate a complete, well-structured JSON following this format exactly. The structure will be used to generate documentation files automatically.
```

## Usage

1. Visit the [live demo](https://dharanigowthamsampath.github.io/Nextra-File-Generator)
2. Generate content structure using ChatGPT with the above prompt
3. Enter the generated JSON structure
4. Click "Create & Download Zip" button
5. Extract the ZIP into your Nextra project's pages directory

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
