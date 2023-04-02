import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as path from 'path';

async function run() {
  try {
    let version = core.getInput('release');
    let platform = core.getInput('platform');
    let arch = core.getInput('arch');
    if (version) {
      await getKubeseal(version, platform, arch);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function getKubeseal(version, platform, arch) {
  let toolPath = tc.find('kubeseal', version, platform, arch);

  if (!toolPath) {
    toolPath = await downloadKubeseal(version, platform, arch);
  }

  toolPath = path.join(toolPath, 'bin');
  core.addPath(toolPath);
}

async function downloadKubeseal(version, platform, arch) {
  const toolDirectoryName = `kubeseal-${version}-${platform}-${arch}`;
  const downloadUrl = `https://github.com/bitnami-labs/sealed-secrets/releases/download/v${version}/kubeseal-${version}-${platform}-${arch}.tar.gz`;
  console.log(`downloading ${downloadUrl}`);

  try {
    const downloadPath = await tc.downloadTool(downloadUrl);
    console.log(`downloadpath ${downloadPath}`);
    const extractedPath = await tc.extractTar(downloadPath, toolDirectoryName);
    console.log(`extractpath ${extractedPath}`);
    let toolRoot = path.join(extractedPath, toolDirectoryName);
    console.log(`toolroot ${toolRoot}`);
    return await tc.cacheDir(toolRoot, 'kubeseal', version, platform, arch);
  } catch (err) {
    throw err;
  }
}

run();
