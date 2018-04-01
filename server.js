'use strict';

const express = require('express');
const grpc = require('grpc');
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;


var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(express.json());

const lndCert = fs.readFileSync('/Users/mcgingras/Library/Application Support/LND/tls.cert');
// const adminMacaroon = fs.readFileSync('/Users/mcgingras/Library/Application Support/LND/admin.macaroon');
const localMacaroon = fs.readFileSync('/Users/mcgingras/go/dev/alice/test_data/admin.macaroon');

const meta = new grpc.Metadata();
// meta.add('macaroon', adminMacaroon.toString('hex'));
meta.add('macaroon', localMacaroon.toString('hex'));
process.env.GRPC_SSL_CIPHER_SUITES = "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384";
const credentials = grpc.credentials.createSsl(lndCert);

const lnrpcDescriptor = grpc.load("rpc.proto");
const lnrpc = lnrpcDescriptor.lnrpc;
const lightning = new lnrpc.Lightning('localhost:10001', credentials);
const walletUnlocker = new lnrpc.WalletUnlocker('localhost:10001', credentials);


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From h', data: req.query.data});
});


// in a move to get rid of the APIs being served in express, I'm thinking we might be able to just request this api on start
app.get('/api/lnd', (req, res) => {
  res.send({lnd: lightning, meta: meta});
});

// getInfo
// ----
// simply calls the getInfo command
app.get('/api/info', (req, res) => {
  var _call = lightning.getInfo({}, meta, function(err, response) {
      if (err) console.log(err);
      if (response) res.send({ address: response.identity_pubkey, peers: response.num_peers, channels: response.num_active_channels });
  });
})

// channels
// ----
// returns channel object.
// will inspect for relevent info
// keep it just as channels and pull stuff out in react ( in case of multiple channels ) ?
app.get('/api/channels', (req, res) => {
  var _call = lightning.listChannels({}, meta, function(err, response) {
      if (err) console.log(err);
      if (response) res.send({ channels: response.channels });
  });
})

// balance
// ---
// total_balance
// confirmed_balance
// unconfirmed_balance
app.get('/api/balance', (req, res) => {
  var _call = lightning.walletBalance({}, meta, function(err, response) {
      if (err) console.log(err);
      if (response) res.send({total_balance: response.total_balance});
  });
})


// not sure how to send data?
// maybe somthing to do with the req
app.get('/api/connect', (req, res) => {
  var _call = lightning.connectPeer({}, meta, function(err, response) {
      if (err) console.log(err);
      if (response) res.send({total_balance: response.total_balance});
  });
})

// invoice
// ----
// generate an invoice
// value - how much to send
// payment request -- invoice to give to other person
app.get('/api/invoice', (req, res) => {
  var _call = lightning.addInvoice({value: req.query.value}, meta, function(err, response) {
    if (err) console.log(err);
    if (response) res.send({res: "wallet created"})
  });
})


// // createWallet
// // ----
// // generates a wallet for the user
// // password - the password to encrypt it
// // note: the security totally needs work -- just tryna get it to work
// app.get('/api/createWallet', (req, res) => {
//   var _call = walletUnlocker.genSeed({}, function(err, response){
//     if (err) console.log(err);
//     if (response) {
//       var seed  = response.cipher_seed_mnemonic;
//       var _call = walletUnlocker.initWallet({wallet_password: req.query.password, cipher_seed_mnemonic: seed, aezeed_passphrase: "invalid??"},
//       function(err, response){
//         if (err) console.log(err);
//         if (response) res.send({wallet: "wallet is created"});
//       })
//     }
//   })
// })
//
// // unlockWallet
// // ----
// // unlocks an existing wallet
// // password - the password to encrypt it
// app.get('/api/unlockWallet', (req, res) => {
//   var _call = walletUnlocker.unlockWallet({wallet_password: req.query.password}, function(err, response) {
//     if (err) console.log(err);
//     if (response) res.send({res: "wallet unlocked"})
//   });
// })


app.listen(port, () => console.log(`Listening on port ${port}`));
