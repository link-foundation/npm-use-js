async () => {
  const { join } = require('path');
  const { tmpdir } = require('os');
  const { randomBytes } = require('crypto');
  const { writeFile, unlink } = require('fs/promises');
  const moduleDirecotry = join(tmpdir(), randomBytes(42).toString('hex'));
  const functionResponse = await fetch('https://raw.githubusercontent.com/Konard/use/refs/heads/main/src/use.cjs');
  const functionPath = join(moduleDirecotry, 'use.cjs');
  await writeFile(functionPath, await functionResponse.text());
  const moduleResponse = await fetch('https://raw.githubusercontent.com/Konard/use/refs/heads/main/src/use-module.cjs');
  const modulePath = join(moduleDirecotry, 'use-module.cjs');
  await writeFile(modulePath, await moduleResponse.text());
  const { use } = require(modulePath);
  await unlink(modulePath);
  return use;
}