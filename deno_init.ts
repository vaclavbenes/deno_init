const dir = ".vscode";

await Deno.mkdir(dir);

const settings_file = dir + "/" + "settings.json";

const settings = {
  "deno.enable": true,
  "code-runner.executorMap": {
    "typescript": "deno run -A -c $workspaceRoot/tsconfig.json $fileName",
  },
  "code-runner.runInTerminal": true,
};

const tsconfig_file = "tsconfig.json";

const tsconfig = {
  "compilerOptions": {
    "noImplicitThis": false,
  },
};

const launch_file = dir + "/" + "launch.json";

const launch = {
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Deno",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "deno",
      "runtimeArgs": ["run", "--inspect-brk", "-A", "${fileName}"],
      "port": 9229,
    },
  ],
};

async function create_file(name: string, content: any) {
  await Deno.create(name);
  const enc = new TextEncoder();
  const data = enc.encode(JSON.stringify(content, null, 2));
  const fl = await Deno.open(name, { write: true });
  await Deno.write(fl.rid, data); // 11
  Deno.close(fl.rid);
}

create_file(settings_file, settings);
create_file(tsconfig_file, tsconfig);
create_file(launch_file, launch);
