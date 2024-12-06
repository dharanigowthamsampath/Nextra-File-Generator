// DOM Elements
const jsonInput = document.getElementById("jsonInput");
const createButton = document.getElementById("createFolders");
const errorMessage = document.getElementById("errorMessage");
const outputDisplay = document.getElementById("outputDisplay");

// Event Listeners
createButton.addEventListener("click", handleCreateFolders);

async function handleCreateFolders() {
  try {
    // Clear previous error messages and output
    errorMessage.textContent = "";
    outputDisplay.textContent = "";

    // Parse JSON input
    const folderStructure = JSON.parse(jsonInput.value);

    // Create zip
    const zip = new JSZip();
    const pagesFolder = zip.folder("pages");

    // Process the structure
    await processStructure(pagesFolder, folderStructure);

    // Generate the zip file
    const zipBlob = await zip.generateAsync({ type: "blob" });

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

async function processStructure(parentFolder, structure) {
  const meta = {};

  for (const [key, content] of Object.entries(structure)) {
    if (Array.isArray(content)) {
      // This is a section with files
      const sectionTitle = key.startsWith("--") ? key.substring(2).trim() : key;

      // Add section to meta
      if (key.startsWith("--")) {
        meta[sectionTitle] = {
          title: formatTitle(sectionTitle),
          type: "separator",
        };
      }

      // Create MDX files for each item in the array
      content.forEach((fileName) => {
        const slug = slugify(fileName);
        meta[slug] = fileName;
        parentFolder.file(`${slug}.mdx`, createMDXContent(fileName));
      });
    } else if (typeof content === "object") {
      // This is a folder
      const newFolder = parentFolder.folder(key);

      // Process the subfolder
      await processStructure(newFolder, content);

      // Create _meta.js for the folder if it has direct file children
      const hasDirectFiles = Object.values(content).some((val) =>
        Array.isArray(val)
      );
      if (hasDirectFiles) {
        newFolder.file("_meta.js", createMetaJsContent(content));
      }
    }
  }

  return meta;
}

function createMetaJsContent(structure) {
  const meta = {};

  // Process each key in the structure
  for (const [key, content] of Object.entries(structure)) {
    if (Array.isArray(content)) {
      // This is a section with files
      const sectionTitle = key.startsWith("--") ? key.substring(2).trim() : key;

      if (key.startsWith("--")) {
        // Add separator to meta
        meta[sectionTitle] = {
          title: formatTitle(sectionTitle),
          type: "separator",
        };
      }

      // Add files to meta
      content.forEach((fileName) => {
        const slug = slugify(fileName);
        meta[slug] = fileName;
      });
    }
  }

  return `const meta = ${JSON.stringify(meta, null, 2)};

export default meta;`;
}

function createMDXContent(title) {
  return `# ${title}

Welcome to the ${title} section.

## Overview

Add your content here...
`;
}

function formatTitle(str) {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Show initial instructions
outputDisplay.textContent = `Instructions:
1. Enter your documentation structure as JSON
2. Click "Create & Download Zip" button
3. Your documentation structure will be created with MDX files and _meta.js files

Example JSON structure:
{
  "C++ Programming": {
    "Basics of C++": {
      "Introduction": {
        "--Overview": ["What is C++?", "Key Features of C++"],
        "--Setting Up": ["Installing IDE", "Writing First Program"]
      }
    }
  }
}`;
