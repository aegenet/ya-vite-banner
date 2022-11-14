const path = require('path');
const child_process = require('child_process');

const tasks = {
  /** Build */
  build: () => {
    const cmds = [];
    let version;
    if (process.env.GITHUB_REF_TYPE === 'tag') {
      version = process.env.GITHUB_REF_NAME;
    } else if (process.env.GITHUB_REF_NAME) {
      // workflow github
      version = `999.${new Date().getTime()}.0`;
    }

    if (version) {
      cmds.push(`npm version "${version}"`);
    }

    cmds.push('yarn build');

    return cmds.join(' && ');
  },
  /** Publish */
  publish: () => {
    const cmds = [
      // Remove devDependencies in npm package
      `json -I -f ./package.json -e "this.devDependencies={};this.scripts={};this.jest=undefined;"`,
      `npm publish --registry=https://npm.pkg.github.com/`
    ];
    return cmds.join(' && ');
  },
}

const taskMode = process.argv[2];
if (taskMode && taskMode in tasks) {
  console.log(`[BUILD-FLOW] ${taskMode} starting...`);
  const task = tasks[taskMode];

  console.log(`[BUILD-FLOW] ${taskMode}...`);
  const cmd = task();
  if (cmd) {
    child_process.execSync(cmd, {
      cwd: process.cwd(),
      stdio: 'inherit',
    });
  }
  console.log(`[BUILD-FLOW] ${taskMode} finished.`)
} else {
  console.log(`[BUILD-FLOW] invalid task ${taskMode} provided.`);
  process.exit(1);
}