// const grpc = require('grpc');
// const fs = require("fs");
//
// //  Lnd cert is at ~/.lnd/tls.cert on Linux and
// //  ~/Library/Application Support/Lnd/tls.cert on Mac
// const lndCert = fs.readFileSync('/Users/mcgingras/Library/Application Support/LND/tls.cert');
//
// // We order the suites by priority, based on the recommendations provided by SSL Labs here:
// // https://github.com/ssllabs/research/wiki/SSL-and-TLS-Deployment-Best-Practices#23-use-secure-cipher-suites
// process.env.GRPC_SSL_CIPHER_SUITES = process.env.GRPC_SSL_CIPHER_SUITES || [
//   'ECDHE-ECDSA-AES128-GCM-SHA256',
//   'ECDHE-ECDSA-AES256-GCM-SHA384',
//   'ECDHE-ECDSA-AES128-CBC-SHA256',
//   'ECDHE-ECDSA-CHACHA20-POLY1305'
// ].join(':')
//
// const credentials = grpc.credentials.createSsl(lndCert);
// const rpc = grpc.load("./rpc.proto");
//
// const walletUnlocker = new rpc.lnrpc.WalletUnlocker('localhost:10001', credentials);

export default {
  the: 'this'
  // walletUnlocker: walletUnlocker
}
