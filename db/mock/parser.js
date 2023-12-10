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

function gaussianRandom(mean = 0, stdev = 1) {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  // Transform to the desired mean and standard deviation:
  return z * stdev + mean;
}

function generateGaussianInRange(min, max, mean, stdDev) {
  let value;
  const range = max - min;

  value = gaussianRandom(mean, stdDev);
  // Scale and shift the value to fit within the desired range
  if (value < min) {
    return min;
  } else if (value >= max) {
    return max;
  } else {
    return Math.round(value, 0);
  }
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

//const generatedDistribution = generateGaussian(6000, 13, 8);
const generatedDistribution = [];
for (let i = 0; i < 6000; i++) {
  const gaussianNumberInRange = generateGaussianInRange(0, 23, 13, 4.5);
  generatedDistribution.push(gaussianNumberInRange);
}

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
