import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as path from 'path';

async function run() {
  try {
    let version = core.getInput('cli-release');
    let platform = core.getInput('platform');
    let arch = core.getInput('arch');
    if (version) {
      await getGhCli(version, platform, arch);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function getGhCli(version, platform, arch) {
  let toolPath = tc.find('gh-cli', version, platform, arch);

  if (!toolPath) {
    toolPath = await downloadGhCli(version, platform, arch);
  }

  toolPath = path.join(toolPath, 'bin');
  core.addPath(toolPath);
}

async function downloadGhCli(version, platform, arch) {
  const toolDirectoryName = `gh_${version}_${platform}_${arch}`;
  const downloadUrl = `https://github.com/cli/cli/releases/download/v${version}/gh_${version}_${platform}_${arch}.tar.gz`;
  console.log(`downloading ${downloadUrl}`);

  try {
    const downloadPath = await tc.downloadTool(downloadUrl);
    const extractedPath = await tc.extractTar(downloadPath);
    let toolRoot = path.join(extractedPath, toolDirectoryName);
    return await tc.cacheDir(toolRoot, 'gh-cli', version, platform, arch);
  } catch (err) {
    throw err;
  }
}

run();
