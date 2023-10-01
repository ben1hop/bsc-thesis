const fs = require('fs');
const path = require('path');

// Function to increment values in an SQL insert statement
function incrementValuesInStatement(statement, incrementFactor) {
  const match = statement.match(/insert into (\w+) \(([^)]+)\) values \(([^)]+)\)/i);
  if (!match) {
    console.error(`Invalid SQL insert statement: ${statement}`);
    return statement;
  }

  const tableName = match[1];
  const columns = match[2];
  const values = match[3].split(',');

  // Increment the value in the 'value' column (assuming it's the first column)
  const incrementedValue = parseInt(values[0]) + incrementFactor;
  values[0] = String(incrementedValue);

  // Reconstruct the modified SQL statement
  return `INSERT INTO ${tableName} (${columns}) VALUES (${values.join(',')})`;
}

// Get the current working directory
const inputDirectory = process.cwd();

// Increment factor
const incrementFactor = 1000;

// Read the files in the input directory
fs.readdir(inputDirectory, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
    return;
  }

  // Filter the files that match the naming pattern
  const sqlFiles = files.filter(file => /^EventLog\(\d+\)\.sql$/i.test(file));

  // Process each SQL file
  sqlFiles.forEach(inputFileName => {
    const outputFileName = path.join(inputDirectory, `output_${inputFileName}`);

    const inputFileNumber = parseInt(inputFileName.split('(')[1].split(')')[0]);

    const incrementValue = incrementFactor*inputFileNumber
    
    // Read and process the input file
    fs.readFile(path.join(inputDirectory, inputFileName), 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`);
        return;
      }
      

      // Split the file content by SQL insert statements
      const insertStatements = data.split(';');

      // Process and modify each insert statement
      const modifiedStatements = insertStatements
        .filter(statement => statement.trim()) // Remove empty statements
        .map(statement => {
          statement = incrementValuesInStatement(statement, incrementValue);
          
          return statement;
        });

      // Write the modified SQL statements to an output file
      fs.writeFile(outputFileName, modifiedStatements.join(';\n') + ';', 'utf8', err => {
        if (err) {
          console.error(`Error writing file: ${err}`);
          return;
        }

        console.log(`File "${outputFileName}" with incremented values has been created.`);
      });
    });
  });
});
