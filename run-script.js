import { spawn, spawnSync, execSync, exec } from "child_process";
import path from "path";
import chalk from "chalk";
import waitOn from "wait-on";
import { v2 as compose } from "docker-compose";
const osCommand = (cmd) => (process.platform === "win32" ? cmd + ".cmd" : cmd);
const npm = osCommand("npm");

// should add npm ci-s on first run!
// compose and init script run needs to refined a bit
// option to kill ports if occupied
// separate general run error from occupied port error

var args = process.argv.slice(2).filter((x) => x.startsWith("-"));

const silentMode = "inherit";

if (!!args.includes("-silent")) {
  silentMode = "ignore";
}

async function setupDocker() {
  // step into the db folder
  const dbDir = path.join(process.cwd(), "db");
  try {
    // call the docker compose up
    const container = await compose.upAll({
      cwd: dbDir,
      log: true,
      callback: (chunk, sourceStream) => {
        // Handle process information here
        console.log(`Received ${sourceStream}: ${chunk.toString()}`);
      },
    });
    if (container.exitCode === 0) {
      console.log(
        chalk.green("Docker container is up with base tables. \u221A")
      );
      // when it finished we call the helper table generator script
      spawnSync(
        "docker",
        [
          "exec",
          "-i",
          "bsc-dev-db-1",
          "sh",
          "-c",
          "mysql -u root -ppwd bsc-dev-db < runtime-scripts/helper-tables.sql",
        ],
        {
          stdio: silentMode,
        }
      );
      console.log(chalk.green("Helper table script is completed. \u221A"));

      console.log(
        chalk.green("\n     Docker database is up and running. \u221A")
      );
    } else {
      throw Error(container.err);
    }
  } catch (error) {
    console.error("Error setting up Docker:", error);
  }
}

async function buildAndRunBackend() {
  try {
    process.chdir("server");
    spawnSync(npm, ["ci"], {
      stdio: silentMode,
    });
    const buildCommand = spawnSync(npm, ["run", "build"], {
      stdio: silentMode,
    });
    // check if proccess closed without issues
    if (buildCommand.status === 0) {
      console.log(chalk.green("Building server files are completed. \u221A"));
    } else {
      throw new Error(`Error running npm build: ${buildCommand.error}`);
    }

    // if running?
    try {
      await waitOn({
        resources: ["http://127.0.0.1:9000"],
        timeout: 7500,
        reverse: true,
      });
    } catch (err) {
      throw Error("Server port 9000 is already in use.");
    }

    spawn("node", ["./dist/main.js"], { stdio: silentMode });
    // we cant check process close at this one , looking for its port to be unavailable
    try {
      await waitOn({
        resources: ["http://127.0.0.1:9000"],
        timeout: 10000,
      });
    } catch (err) {
      throw Error("Couldn't access server at port 9000.");
    }
    process.chdir("..");
    console.log(chalk.green("\n     Server is up and running. \u221A"));
  } catch (err) {
    throw Error("\nRunning backend build: \n   - " + err.message);
  }
}

async function buildAndRunClient() {
  try {
    process.chdir("client/tool_analytics_frontend");
    spawnSync(npm, ["ci"], {
      stdio: silentMode,
    });
    // if open?
    try {
      await waitOn({
        resources: ["http://127.0.0.1:8080"],
        timeout: 5000,
        reverse: true,
      });
    } catch (err) {
      throw Error("Client port 8080 is already in use.");
    }

    spawn(npm, ["run", "dev"], {
      stdio: silentMode,
    });
    try {
      await waitOn({
        resources: ["http://127.0.0.1:8080"],
        timeout: 15000,
      });
    } catch (err) {
      throw Error("Couldn't access client at port 8080.");
    }
    console.log(chalk.green("\n     Client is up and running. \u221A"));
  } catch (err) {
    throw Error("\nRunning frontend build: \n   - " + err.message);
  }
}

async function main() {
  try {
    console.log(chalk.blue("1. Starting docker setup..."));
    await setupDocker();
    console.log(chalk.blue("\n2. Starting backend build and setup..."));
    await buildAndRunBackend();
    console.log(chalk.blue("\n3. Starting frontend setup..."));
    await buildAndRunClient();
  } catch (err) {
    console.error(chalk.red(err));
  }
}

main();
