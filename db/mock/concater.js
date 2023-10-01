const fs = require('fs');
const path = require('path');

// Get the current working directory
const inputDirectory = process.cwd();
const outputFileName = 'output.sql'; // Replace with the desired output file name

// Read the files in the input directory
fs.readdir(inputDirectory, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
    return;
  }

  // Filter the SQL files in the directory
  const sqlFiles = files.filter(file => file.endsWith('.sql'));

  // Create a writable stream for the output file
  const outputStream = fs.createWriteStream(path.join(inputDirectory, outputFileName), { flags: 'a' }); // 'a' for append

  // Function to concatenate files recursively
  function concatenateFiles(index) {
    if (index < sqlFiles.length) {
      const currentFile = path.join(inputDirectory, sqlFiles[index]);

      // Read the current SQL file and append its contents to the output file
      const readStream = fs.createReadStream(currentFile);
      readStream.pipe(outputStream, { end: false });

      readStream.on('end', () => {
        // Add a delimiter (e.g., semicolon) between concatenated files
        outputStream.write(';\n');

        // Recursively concatenate the next file
        concatenateFiles(index + 1);
      });
    } else {
      // All files have been concatenated, close the output stream
      outputStream.end();
      console.log(`Files have been concatenated into "${outputFileName}"`);
    }
  }

  // Start the concatenation process
  concatenateFiles(0);
});
