### DEXTER
##### LN x Web App Demo
---

##### Steps

1. go <a href='https://github.com/lightningnetwork/lnd/blob/master/docs/INSTALL.md'>here</a> and follow the installation instructions.
you only need to follow until 'installing btcd'. The rest of the stuff we will handle later. This step installs LND and the necessary packages.


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
mkdir alice bob charlie`
This should run BTCD.
```
