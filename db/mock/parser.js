import fs from "fs";
import path from "path";
import pkg from "node-sql-parser";
const { Parser } = pkg;
// npm install node-sql-parser --save

// Function to increment values in an SQL insert statement
function incrementValuesInStatement(statement, incrementFactor) {
  const match = statement.match(
    /insert into (\w+) \(([^)]+)\) values \(([^)]+)\)/i
  );
  if (!match) {
    console.error(`Invalid SQL insert statement: ${statement}`);
    return statement;
  }

  const tableName = match[1];
  const columns = match[2];
  const values = match[3].split(",");

  // Increment the value in the 'value' column (assuming it's the first column)
  const incrementedValue = parseInt(values[0]) + incrementFactor;
  values[0] = String(incrementedValue);

  // Reconstruct the modified SQL statement
  return `INSERT INTO ${tableName} (${columns}) VALUES (${values.join(",")})`;
}

function generateWeightedValues(amount, mean, deviation) {
  const values = [];

  // Generate values using Box-Muller transform
  for (let i = 0; i < amount; i++) {
    let u = 0,
      v = 0;
    let s = 0;

    while (s >= 1 || s === 0) {
      u = Math.random() * 2 - 1;
      v = Math.random() * 2 - 1;
      s = u * u + v * v;
    }

    const temp = Math.sqrt((-2 * Math.log(s)) / s);
    const z0 = u * temp;
    const generatedValue = z0 * deviation + mean; // Adjust mean and deviation

    // Ensure the value is within the range of 0-24
    const boundedValue = Math.min(Math.max(generatedValue, 0), 23);
    values.push(Math.round(boundedValue, 0));
  }

  return values;
}

function modifyLineWithNewHour(line, newValue) {
  const parser = new Parser();
  const ast = parser.astify(line);

  // console.log(ast.values[0].value[1].value);

  // ast.values.forEach((value) => console.log(String(value.value[1].value)));

  const date = ast.values[0].value[1].value;

  console.log(date);

  const newHour = date.split(" ")[1].replace(/^.{2}/g, newValue);

  const newDate = date.split(" ")[0].concat(" ", newHour);

  console.log(newDate);

  ast.values[0].value[1].value = newDate;

  const modifiedLine = parser.sqlify(ast);

  console.log(modifiedLine);
  return modifiedLine;
}

// Get the current working directory
const inputDirectory = process.cwd();

// Increment factor
const incrementFactor = 1000;

const generatedDistribution = generateWeightedValues(6000, 13, 8);

// Read the files in the input directory
fs.readdir(inputDirectory, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
    return;
  }
  // Filter the files that match the naming pattern
  //const sqlFiles = files.filter((file) => /^EventLog/i.test(file));
  const inputFileName = "EventLog.sql";
  fs.readFile(inputFileName, "utf8", (err, data) => {
    // Process each SQL file
    //sqlFiles.forEach((inputFileName) => {
    const outputFileName = path.join(inputDirectory, `output_${inputFileName}`);

    // Read and process the input file
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }

    // Split the file content by SQL insert statements
    const insertStatements = data.split(";");

    let i = 0;
    // Process and modify each insert statement
    const modifiedStatements = insertStatements
      .filter((statement) => statement.trim()) // Remove empty statements
      .map((statement) => {
        //statement = incrementValuesInStatement(statement, incrementValue);; // mysql sql grammer parsed by default

        statement = modifyLineWithNewHour(statement, generatedDistribution[i]);
        i++;
        //console.log("index:" + i + "genvalue" + generatedDistribution[i]);
        return statement;
      });

    // Write the modified SQL statements to an output file
    fs.writeFile(
      outputFileName,
      modifiedStatements.join(";\n") + ";",
      "utf8",
      (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
          return;
        }

        console.log(
          `File "${outputFileName}" with incremented values has been created.`
        );
      }
    );
  });
  //});
});
