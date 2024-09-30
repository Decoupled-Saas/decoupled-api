#!/usr/bin/env node
const jose = require('node-jose');
const { JWTs } = require('../src/models');

async function main() {
  const accessKeyStore = jose.JWK.createKeyStore();
  const refreshKeyStore = jose.JWK.createKeyStore();

  const accessKey = await accessKeyStore.generate('RSA', 2048, { alg: 'RS256', use: 'sig' });
  const refreshKey = await refreshKeyStore.generate('RSA', 2048, { alg: 'RS256', use: 'sig' });

  await JWTs.create({
    access_key: accessKey.toJSON(true),
    refresh_key: refreshKey.toJSON(true)
  });

  // eslint-disable-next-line no-console
  console.log(accessKey.toJSON());
  console.log(refreshKey.toJSON());
}

main();
