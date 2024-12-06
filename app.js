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

    // Create pages folder as root
    const pagesFolder = zip.folder("pages");

    // Process each folder and its files
    for (const [folderPath, files] of Object.entries(folderStructure)) {
      if (Array.isArray(files)) {
        // Create folder and its meta.js
        const currentFolder = pagesFolder.folder(folderPath);
        const metaContent = createMetaContent(files);
        currentFolder.file("_meta.js", metaContent);

        // Create MDX files (skip separator entries)
        files.forEach((file) => {
          if (!file.startsWith("--")) {
            currentFolder.file(`${file}.mdx`, createMDXContent(file));
          }
        });
      }
    }

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

function createMetaContent(files) {
  const meta = {};

  files.forEach((file) => {
    if (file.startsWith("--")) {
      // Handle separator
      const title = file.substring(2).trim();
      meta[file] = {
        title: formatTitle(title),
        type: "separator",
      };
    } else {
      // Handle regular file
      meta[file] = formatTitle(file);
    }
  });

  return `const meta = ${JSON.stringify(meta, null, 2)};

export default meta;`;
}

function createMDXContent(filename) {
  const title = formatTitle(filename);
  return `# ${title}

Welcome to the ${title} section.

## Overview

Add your content here...
`;
}

function formatTitle(str) {
  // Remove any leading dashes and trim
  str = str.replace(/^-+/, "").trim();

  // Convert kebab-case or snake_case to Title Case
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Show initial instructions
outputDisplay.textContent = `Instructions:
1. Enter your documentation structure as JSON
2. Click "Create & Download Zip" button
3. Your documentation structure will be created with MDX files and _meta.js files

Example JSON structure:
{
    "C": [
        "--Getting Started",
        "index",
        "why_c",
        "history",
        "--Setup",
        "setup",
        "ide_intro",
        "compile_run"
    ],
    "C/operators": [
        "--Basic Operators",
        "c_arithmetic_operators",
        "c_relational_operators",
        "--Advanced Operators",
        "c_logical_operators",
        "c_assignment_operators"
    ],
    "algorithms": [
        "--Sorting",
        "bubble_sort",
        "quick_sort",
        "--Searching",
        "linear_search",
        "binary_search"
    ]
}`;
