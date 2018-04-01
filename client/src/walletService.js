'use strict';

const grpc = require('grpc');
const fs = require("fs");

//  Lnd cert is at ~/.lnd/tls.cert on Linux and
//  ~/Library/Application Support/Lnd/tls.cert on Mac
const lndCert = fs.readFileSync('/Users/mcgingras/Library/Application Support/LND/tls.cert');


// We order the suites by priority, based on the recommendations provided by SSL Labs here:
// https://github.com/ssllabs/research/wiki/SSL-and-TLS-Deployment-Best-Practices#23-use-secure-cipher-suites
process.env.GRPC_SSL_CIPHER_SUITES = process.env.GRPC_SSL_CIPHER_SUITES || [
  'ECDHE-ECDSA-AES128-GCM-SHA256',
  'ECDHE-ECDSA-AES256-GCM-SHA384',
  'ECDHE-ECDSA-AES128-CBC-SHA256',
  'ECDHE-ECDSA-CHACHA20-POLY1305'
].join(':')

const credentials = grpc.credentials.createSsl(lndCert);
const rpc = grpc.load("./config/rpc.proto");

const walletUnlocker = new rpc.lnrpc.WalletUnlocker('localhost:10001', credentials);

// buffer buffer buffer
function btoa(b) {
    return new Buffer(b).toString('base64');
};

// var call = walletUnlocker.unlockWallet({
//     wallet_password: btoa(pw),
//   }, function(err, response) {
//     if (err) console.log(err);
//     console.log('UnlockWallet: ' + response);
//   })

var seed;
// generate the seed and save it
var _call = walletUnlocker.genSeed({}, function(err, response) {
    if (err) console.log(err);
    if (response){
      seed = response.cipher_seed_mnemonic;

      console.log(seed);

      var _call = walletUnlocker.initWallet(
        {
          wallet_password: btoa('thisismypassword11111'),
          cipher_seed_mnemonic: seed,
        },
         function(err, response) {
          if (err) console.log(err);
          if (response)  console.log("its working!");
      });

    }
});
