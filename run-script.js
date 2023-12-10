import { spawn, spawnSync, execSync, exec } from "child_process";
import path from "path";
import chalk from "chalk";
import waitOn from "wait-on";
import { v2 as compose } from "docker-compose";
const osCommand = (cmd) => (process.platform === "win32" ? cmd + ".cmd" : cmd);
const npm = osCommand("npm");

async function setupDocker() {
  // step into the db folder
  const dbDir = path.join(process.cwd(), "db");
  try {
    // call the docker compose up
    const container = await compose.upAll({ cwd: dbDir, log: true });
    console.log(
      chalk.green(" - Docker container is up with base tables. \u221A")
    );
    // when it finished we call the helper table generator script
    if (container.exitCode === 0) {
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
          stdio: "inherit",
        }
      );
      console.log(chalk.green(" - Helper table script is completed. \u221A"));
    }
    console.log(chalk.green("   Docker database is up and running. \u221A"));
  } catch (error) {
    console.error("Error setting up Docker:", error);
  }
}

async function buildAndRunBackend() {
  try {
    process.chdir("server");
    const buildCommand = spawnSync(npm, ["run", "build"], {
      stdio: "ignore",
    });
    console.log(chalk.green(" - Building server files are completed. \u221A"));

    if (buildCommand.error) {
      throw new Error(`Error running npm build: ${buildCommand.error}`);
    }

    // if running?

    spawn("node", ["./dist/main.js"], {
      stdio: "ignore",
    });
    await waitOn({ resources: ["http://127.0.0.1:9000"], timeout: 20000 });
    process.chdir("..");
    console.log(chalk.green("   Server is up and running. \u221A"));
  } catch (err) {
    throw Error("Error running backend build:", err);
  }
}

async function buildAndRunClient() {
  try {
    process.chdir("client/tool_analytics_frontend");

    // if open?

    spawn(npm, ["run", "dev"], {
      stdio: "ignore",
    });
    await waitOn({ resources: ["http://127.0.0.1:8080"], timeout: 20000 });
    console.log(chalk.green("   Client is up and running. \u221A"));
  } catch (err) {
    throw Error("Error running frontend build:", err);
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
    //console.clear();
    console.error(chalk.red(err));
  }
}

main();
