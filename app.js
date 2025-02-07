// API Interface
window.NextraAPI = {
  async generateDocs(structure) {
    try {
      // Create zip
      const zip = new JSZip();
      const pagesFolder = zip.folder("pages");

      // Process the structure
      await this.processStructure(pagesFolder, structure);

      // Generate the zip file
      const zipBlob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 9,
        },
      });

      return zipBlob;
    } catch (error) {
      throw new Error(`Failed to generate documentation: ${error.message}`);
    }
  },

  async processStructure(parentFolder, structure) {
    const meta = {};

    for (const [key, content] of Object.entries(structure)) {
      if (typeof content === "string") {
        // Handle direct string values (like "Introduction to Go")
        const slug = this.slugify(key);
        meta[slug] = content;
        parentFolder.file(`${slug}.mdx`, this.createMDXContent(content));
      } else if (Array.isArray(content)) {
        // Handle arrays (like Data Types array)
        const sectionTitle = key.startsWith("--") ? key.substring(2).trim() : key;
        
        if (key.startsWith("--")) {
          meta[`--${sectionTitle}`] = {
            title: this.formatTitle(sectionTitle),
            type: "separator",
          };
        }

        // Process array items
        for (const item of content) {
          const slug = this.slugify(item);
          meta[slug] = item;
          parentFolder.file(`${slug}.mdx`, this.createMDXContent(item));
        }
      } else if (typeof content === "object") {
        // Handle nested objects (like sections)
        const newFolder = parentFolder.folder(this.slugify(key));
        meta[this.slugify(key)] = key;
        
        // Process the subfolder and get its meta
        const subMeta = await this.processStructure(newFolder, content);
        
        // Create _meta.js for subfolder
        const subMetaContent = `const meta = ${JSON.stringify(subMeta, null, 2)};

export default meta;`;
        newFolder.file("_meta.js", subMetaContent);
      }
    }

    // Create _meta.js for the current folder
    const metaContent = `const meta = ${JSON.stringify(meta, null, 2)};

export default meta;`;
    parentFolder.file("_meta.js", metaContent);

    return meta;
  },

  createMDXContent(title) {
    return `# ${title}

Welcome to the ${title} documentation.

## Overview

This is an auto-generated documentation page for ${title}.

## Content

Add your detailed content here for ${title}...
`;
  },

  formatTitle(str) {
    return str
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  },

  slugify(str) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/[-]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .replace(/[()]/g, "");
  },
};

// UI Event Handlers (only if running in the web interface)
if (typeof document !== "undefined") {
  // DOM Elements
  const jsonInput = document.getElementById("jsonInput");
  const createButton = document.getElementById("createFolders");
  const errorMessage = document.getElementById("errorMessage");
  const outputDisplay = document.getElementById("outputDisplay");

  async function handleCreateFolders() {
    try {
      // Clear previous error messages and output
      errorMessage.textContent = "";
      outputDisplay.textContent = "";

      // Parse JSON input
      const folderStructure = JSON.parse(jsonInput.value);

      // Generate documentation using the API
      const zipBlob = await NextraAPI.generateDocs(folderStructure);

      // Create download link
      const downloadUrl = URL.createObjectURL(zipBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = "nextra_docs.zip";

      // Trigger download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Cleanup
      URL.revokeObjectURL(downloadUrl);

      // Display success message
      outputDisplay.textContent =
        "Documentation structure created and zipped successfully!\n\nCreated structure:\n" +
        JSON.stringify(folderStructure, null, 2);
    } catch (error) {
      if (error instanceof SyntaxError) {
        errorMessage.textContent =
          "Invalid JSON format. Please check your input.";
      } else {
        errorMessage.textContent =
          error.message || "An error occurred while creating the zip file.";
      }
      console.error("Error:", error);
    }
  }

  // Event Listeners
  createButton.addEventListener("click", handleCreateFolders);

  // Example in output display
  outputDisplay.textContent = `Instructions:
1. Enter your documentation structure as JSON
2. Click "Create & Download Zip" button
3. Your documentation structure will be created with MDX files and _meta.js files

Example JSON structure:
{
  "Java Documentation": {
    "Java Basics": {
      "--Variables and Data Types": [
        "Variables Overview",
        {
          "Primitive Data Types": [
            "byte",
            "short",
            "int",
            "long"
          ]
        },
        {
          "Non-Primitive Data Types": [
            "Strings",
            "Arrays",
            "Classes"
          ]
        }
      ]
    }
  }
}`;
}
