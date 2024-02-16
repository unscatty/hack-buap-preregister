import fs from 'fs-extra';
// import { glob } from 'glob';
import fg from 'fast-glob';
import path from 'node:path';

async function htmlToJS(inputPattern, outputDir) {
  console.log(`Converting HTML files matching the pattern '${inputPattern}' to JS and saving to '${outputDir}'...`);

  try {
    // Find all HTML files matching the input pattern
    const htmlFiles = await fg(inputPattern);

    if (htmlFiles.length === 0) {
      return;
    }

    // Process each HTML file
    await Promise.all(htmlFiles.map(async (htmlFile) => {
      const htmlContent = await fs.readFile(htmlFile, 'utf-8');

      // Get the relative path of the HTML file (relative to input pattern)
      const relativePath = path.basename(htmlFile);

      // Output file path (respects original folder structure)
      const outputFilePath = `${outputDir}${relativePath.replace('.html', '.ts')}`;

      // Convert HTML content to JavaScript string literal
      const jsContent = `export default \`${htmlContent}\`;`;

      // Ensure output directory exists
      await fs.ensureDir(outputDir);

      // Write JavaScript content to output file
      await fs.writeFile(outputFilePath, jsContent, 'utf-8');

      console.log(`HTML file '${htmlFile}' successfully converted to JS and saved as '${outputFilePath}'.`);
    }));

    console.log('All HTML files converted to JS successfully.');
  } catch (error) {
    console.error('Error converting HTML to JS:', error);
  }
}

// Command line arguments
const [, , inputPattern, outputDir] = process.argv;

if (!inputPattern || !outputDir) {
  console.error('Usage: node html-to-js.js <input-pattern> <output-dir>');
  process.exit(1);
}

// Invoke the conversion function
htmlToJS(inputPattern, outputDir);
