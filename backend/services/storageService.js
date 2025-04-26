const fs = require("fs").promises;
const path = require("path");

/**
 * Reads data from a JSON file.
 * Creates the directory if it doesn't exist.
 * Returns an empty array if the file doesn't exist or is invalid JSON.
 * @param {string} filePath - The full path to the JSON file.
 * @returns {Promise<Array|Object>} A promise that resolves with the parsed JSON data (usually an array).
 * @throws {Error} If there's an error reading the file (other than ENOENT or SyntaxError).
 */
async function readData(filePath) {
  try {
    // Ensure the directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty/invalid JSON, return an empty array (common case for starting)
    if (error.code === "ENOENT" || error instanceof SyntaxError) {
      console.warn(
        `Warning: File not found or invalid JSON at ${filePath}. Returning empty array.`
      );
      return []; // Default to an empty array if file not found or malformed
    }
    // Log and re-throw other errors
    console.error(`Error reading data file at ${filePath}:`, error);
    throw new Error(`Could not read data from ${path.basename(filePath)}.`);
  }
}

/**
 * Writes data to a JSON file.
 * Overwrites the existing file content.
 * @param {string} filePath - The full path to the JSON file.
 * @param {Array|Object} data - The data to write (should be JSON-serializable).
 * @returns {Promise<void>} A promise that resolves when the file is written.
 * @throws {Error} If there's an error writing the file.
 */
async function writeData(filePath, data) {
  try {
    // Ensure the directory exists before writing
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error(`Error writing data file at ${filePath}:`, error);
    throw new Error(`Could not save data to ${path.basename(filePath)}.`);
  }
}

module.exports = {
  readData,
  writeData,
};
