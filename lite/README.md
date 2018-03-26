### LND in Light Mode (w/ testnet!)
---

First thing we are going to need to do is open up lnd. You might need to install lnd first. It should take ten minutes or so for lnd to sync up to the blockchain. The block height is ~ 1300000.
```
lnd --rpclisten=localhost:10003 --listen=localhost:10013 --restlisten=localhost:8003 --datadir=test_data --logdir=test_log --bitcoin.testnet --bitcoin.active --bitcoin.node=neutrino --neutrino.connect=faucet.lightning.community
```

open up a new tab and type this to create a wallet, then unlock the wallet. Make sure the path you use for the macaroons matches what is actually on your computer.  
```
lncli --rpcserver=localhost:10003 --macaroonpath=/Users/mcgingras/go/dev/dara/test_data/admin.macaroon create
lncli --rpcserver=localhost:10003 --macaroonpath=/Users/mcgingras/go/dev/dara/test_data/admin.macaroon unlock
```

if you run this command you should get a json with some info.
```
lncli --rpcserver=localhost:10003 --macaroonpath=/Users/mcgingras/go/dev/charlie/test_data/admin.macaroon getinfo
```
