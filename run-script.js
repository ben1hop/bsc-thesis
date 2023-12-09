import { spawn, spawnSync, execSync, exec } from "child_process";
import path from "path";
import chalk from "chalk";
import waitOn from "wait-on";
import { v2 as compose } from "docker-compose";
const osCommand = (cmd) => (process.platform === "win32" ? cmd + ".cmd" : cmd);
const npm = osCommand("npm");

async function setupDocker() {
  const service = "db";
  const dbDir = path.join(process.cwd(), "db");
  try {
    console.log(`Current directory: ${dbDir}`);

    // Start the specified service
    const container = await compose.upAll({ cwd: dbDir, log: true });
    if (container.exitCode === 0) {
      const command = `docker exec -i bsc-dev-db-1 sh -c 'mysql -u root -ppwd bsc-dev-db < runtime-scripts/helper-tables.sql'`;

      execSync(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    }
    console.log("Docker setup done");
  } catch (error) {
    console.error("Error setting up Docker:", error);
  }
}

async function buildAndRunBackend() {
  try {
    process.chdir("server");
    console.log("start build");
    const buildCommand = spawnSync(npm, ["run", "build"], {
      stdio: "inherit",
    });

    if (buildCommand.error) {
      throw new Error(`Error running npm build: ${buildCommand.error}`);
    }

    const runCommand = spawn("node", ["./dist/main.js"], {
      stdio: "inherit",
    });
    await waitOn({ resources: ["http://127.0.0.1:9000"], timeout: 20000 });
    process.chdir("..");
  } catch (err) {
    throw Error("Error running backend build:", err);
  }
}

async function buildAndRunClient() {
  try {
    process.chdir("client/tool_analytics_frontend");
    console.log("start build");

    const runCommand = spawn(npm, ["run", "dev"], {
      stdio: "inherit",
    });
    await waitOn({ resources: ["http://127.0.0.1:8080"], timeout: 20000 });
  } catch (err) {
    throw Error("Error running frontend build:", err);
  }
}

async function main() {
  try {
    await setupDocker();
    await buildAndRunBackend();
    await buildAndRunClient();
  } catch (err) {
    //console.clear();
    console.error(chalk.red(err));
  }
}

main();
