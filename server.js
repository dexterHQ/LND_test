'use strict';

const express = require('express');
const grpc = require('grpc');
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;

let btoa = (s) => { return Buffer.from(s).toString('base64') }

let toHex = (s) => {
    var s = unescape(encodeURIComponent(s))
    var h = ''
    for (var i = 0; i < s.length; i++) {
        h += s.charCodeAt(i).toString(16)
    }
    return h
}

process.env.GRPC_SSL_CIPHER_SUITES = "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384";

let lightning;
let meta;

// TODO:
// is there such thing as a multi-tiered express api?
// ------
// /api/lnd/* -> for all of these check for macaroons once
// /api/lnd/info -> macaroons are already handled....


// the is a piece of "middleware" that allows us to instantiate the lnd creds
// I think there must be an eaiser way to do this, but its working for now...
app.use('/lightning/', (req,res,next) => {
  if (fs.existsSync('/Users/mcgingras/go/dev/alice/test_data/admin.macaroon')){
    const lndCert = fs.readFileSync('/Users/mcgingras/Library/Application Support/LND/tls.cert');
    const credentials = grpc.credentials.createSsl(lndCert);
    const localMacaroon = fs.readFileSync('/Users/mcgingras/go/dev/alice/test_data/admin.macaroon');

    const lnrpcDescriptor = grpc.load("rpc.proto");
    const lnrpc = lnrpcDescriptor.lnrpc;

    meta = new grpc.Metadata();
    meta.add('macaroon', localMacaroon.toString('hex'));
    lightning = new lnrpc.Lightning('localhost:10003', credentials);

    next();
    // TODO: we should have some sort of error handling in here.
  }
});

// getInfo
// ----
// simply calls the getInfo command
app.get('/lightning/getInfo', (req,res) => {
  var _call = lightning.getInfo({}, meta, function(err, response) {
      if (err) console.log(err);
      if (response) res.send({ address: response.identity_pubkey, peers: response.num_peers, channels: response.num_active_channels });
  });
});


// openChannel
// ----
// opens a channel with a certain port
app.get('/lightning/openChannel', (req,res) => {
  var addr = Buffer.from(req.query.addr, 'hex');
  var amt  = Number(req.query.amt);
  var _call = lightning.openChannel({node_pubkey: addr, local_funding_amount: amt}, meta);

  _call.on('data', function(message) {
    console.log(message);
  });

  _call.on('end', function() {
    console.log("END");
  });

  _call.on('status', function(status) {
    console.log("Current status: " + status);
  });
});


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
  if (fs.existsSync('/Users/mcgingras/go/dev/alice/test_data/admin.macaroon')){
      const lndCert = fs.readFileSync('/Users/mcgingras/Library/Application Support/LND/tls.cert');
      const credentials = grpc.credentials.createSsl(lndCert);
      const localMacaroon = fs.readFileSync('/Users/mcgingras/go/dev/alice/test_data/admin.macaroon');
      const meta = new grpc.Metadata();
      meta.add('macaroon', localMacaroon.toString('hex'));

      const lnrpcDescriptor = grpc.load("rpc.proto");
      const lnrpc = lnrpcDescriptor.lnrpc;

      const lightning = new lnrpc.Lightning('localhost:10001', credentials);
    var addr = req.query.addr

    var lnaddr = {
      pubkey: "0292c50922a7d9876f45122e5179fdf391e0902b26a467a631170f5d55381e76a1",
      host: "localhost:10012"
    }
    var _call = lightning.connectPeer({addr: lnaddr}, meta, function(err, response) {
        if (err) console.log(err);
        if (response) res.send({res: response});
    });
  }
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


// createWallet
// ----
// generates a wallet for the user
// password - the password to encrypt it
// note: the security totally needs work -- just tryna get it to work
// also note: aezeed_passphrase doesnt seem to be working
app.get('/api/createWallet', (req, res) => {
  const lndCert = fs.readFileSync('/Users/mcgingras/Library/Application Support/LND/tls.cert');
  const credentials = grpc.credentials.createSsl(lndCert);

  const lnrpcDescriptor = grpc.load("rpc.proto");
  const lnrpc = lnrpcDescriptor.lnrpc;
  const walletUnlocker = new lnrpc.WalletUnlocker('localhost:10003', credentials);

  var _call = walletUnlocker.genSeed({}, function(err, response){
    if (err) console.log(err);
    if (response) {
      var seed  = response.cipher_seed_mnemonic;
      var _call = walletUnlocker.initWallet({wallet_password: btoa(req.query.password), cipher_seed_mnemonic: seed},
      function(err, response){
        if (err) console.log(err);
        if (response) {
          res.send({wallet: true})
        }
      })
    }
  })
})
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
