'use strict';

const express = require('express');
const grpc = require('grpc');
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;

const lndCert = fs.readFileSync('/Users/mcgingras/Library/Application Support/LND/tls.cert');
const adminMacaroon = fs.readFileSync('/Users/mcgingras/Library/Application Support/LND/admin.macaroon');

const meta = new grpc.Metadata();
meta.add('macaroon', adminMacaroon.toString('hex'));
process.env.GRPC_SSL_CIPHER_SUITES = "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384";
const credentials = grpc.credentials.createSsl(lndCert);

const lnrpcDescriptor = grpc.load("rpc.proto");
const lnrpc = lnrpcDescriptor.lnrpc;
const lightning = new lnrpc.Lightning('localhost:10009', credentials);

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From h' });
});

app.get('/api/info', (req, res) => {
  var _call = lightning.getInfo({}, meta, function(err, response) {
      if (err) console.log(err);
      if (response) res.send({ adresss: response.identity_pubkey, channels: response.num_active_channels });
  });
})

app.listen(port, () => console.log(`Listening on port ${port}`));
