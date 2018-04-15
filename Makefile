btcd:
	btcd --txindex --simnet --rpcuser=kek --rpcpass=kek


ln-alice:
	cd ~/go/dev/alice; lnd --rpclisten=localhost:10003 --listen=localhost:10013 --restlisten=localhost:8003 --datadir=test_data --logdir=test_log --bitcoin.simnet --bitcoin.active --bitcoin.node=btcd --btcd.rpcuser=kek --btcd.rpcpass=kek

ln-bob:
	cd ~/go/dev/bob; lnd --rpclisten=localhost:10002 --listen=localhost:10012 --restlisten=localhost:8002 --datadir=test_data --logdir=test_log --bitcoin.simnet --bitcoin.active --bitcoin.node=btcd --btcd.rpcuser=kek --btcd.rpcpass=kek
