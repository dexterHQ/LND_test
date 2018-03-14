### DEXTER
##### LN x Web App Demo
---

##### Steps

1. go <a href='https://github.com/lightningnetwork/lnd/blob/master/docs/INSTALL.md'>here</a> and follow the installation instructions to install LND and the necessary packages. You only need to follow until 'installing btcd'. The rest of the stuff we will handle later.

2. Now we are going to start running the actual LND nodes. To make this as simple as possible, we are going to start by running in simnet mode, which means the bitcoin blockchain we are dealing with is locally on your computer. Other options are testnet and mainnet, but those are a bit more complicated and require additional setup.

3. Follow the commands. Each block of code should be run in a different terminal window. I will label each new terminal window and reference the labels so you know which one is currently being written to.


```
** terminal 1 **

# Start the btcd node
btcd --txindex --simnet --rpcuser=kek --rpcpass=kek
```

```
** terminal 2 **

# Create our development space
cd $GOPATH
mkdir dev
cd dev

# Create folders for each of our nodes
mkdir alice bob`
cd alice
lnd --rpclisten=localhost:10001 --listen=localhost:10011 --restlisten=localhost:8001 --datadir=test_data --logdir=test_log --bitcoin.simnet --bitcoin.active --bitcoin.node=btcd --btcd.rpcuser=kek --btcd.rpcpass=kek

# Command t to open a new tab in this terminal window
# NOTE your macaroon path will be slightly different
lncli --rpcserver=localhost:10001 --macaroonpath=/Users/mcgingras/go/dev/alice/test_data/admin.macaroon create
```
This creates a new wallet linked to the lnd instance. You can click through the password phase. The macaroon path is really important, usually when you spin up a lnd node, the macaroons get stored in the application support folder tucked deep in a directory far away on your computer, but since we are trying to test with multiple nodes all hooked up on simnet, we want different wallets to be available. This is why we included the --datadir flag, and set it to test_data. The macaroons are being stored in this folder, so when we connect using lncli we need to specify this as the path. This is important, and was the cause of a lot of confusion for me early on :-(

4. Next, we will open a lnd node our friend bob.
```
** terminal 3 **

cd $GOPATH/dev/bob
lnd --rpclisten=localhost:10002 --listen=localhost:10012 --restlisten=localhost:8002 --datadir=test_data --logdir=test_log --bitcoin.simnet --bitcoin.active --bitcoin.node=btcd --btcd.rpcuser=kek --btcd.rpcpass=kek

# Command t to open a new tab in this terminal window
lncli --rpcserver=localhost:10002 --macaroonpath=/Users/mcgingras/go/dev/bob/test_data/admin.macaroon create
```
now Alice and Bob both have lnd nodes with wallets to match. Looking good so far.

5. Generate an address for Alice and send her some tokens.
```
**terminal 2 (alice) **

# generates an address for alice.
lncli --rpcserver=localhost:10001 --macaroonpath=/Users/mcgingras/go/dev/alice/test_data/admin.macaroon newaddress np2wkh
```
this will spit back an address, which you should copy because we are going to need it in a second.

```
** terminal 1 **

# command z to kill the current btcd process
# next I like to kill the process just to keep things clean (not necessary)

kill %1
btcd --simnet --txindex --rpcuser=kek --rpcpass=kek --miningaddr=<ALICE_ADDRESS>

# command t to open a new tab in this terminal window
btcctl --simnet --rpcuser=kek --rpcpass=kek generate 400

# optional to confirm that the segwit is active
btcctl --simnet --rpcuser=kek --rpcpass=kek getblockchaininfo | grep -A 1 segwit

```

this sets the mining address to alice, and generates 400 transactions which are all mined by alice (meaning she rakes in the coins)

6. Navigate to the directory holding this repo and run the web app.
```
** terminal 4 **

git clone https://github.com/dexterHQ/LND_test.git
cd LND_test
npm install
node server.js

# command t to open a new tab in this terminal window
yarn dev
```

point your browser to <a href="localhost:3000">localhost:3000</a>

7. The web app will by default open with a connection to alice. We want to add bob as a peer, and open a channel with him.
Click 'add peer' and type in Bobs public key. We can find Bob's public key by typing the following

```
** terminal 3 (bob) **
lncli --rpcserver=localhost:10002 --macaroonpath=/Users/mcgingras/go/dev/bob/test_data/admin.macaroon getinfo
```
bobs public key should be one of the top fields in the object that is returned.





---
If there are any errors with the following instructions you can contact Michael - mcg79@cornell.edu
