// ACTIONS x APIs
// wanted to make this it's own component

 let getBalance = async () => {
    const response = await fetch('/api/balance');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

 let getInfo = async () => {
    const response = await fetch('/lightning/getInfo');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  let openChannel = async (addr,amt) => {
    const response = await fetch('/lightning/openChannel?addr='+addr+"&amt="+amt);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  let getChannels = async () => {
    const response = await fetch('/api/channels');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  let genInvoice = async (amount) => {
    const response = await fetch('/api/invoice?amount='+amount);
    const body = await response.json();
    console.log(body);

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  // we need a pubkey and a host -- two different things :/
  let connectPeer = async (addr) => {
    const response = await fetch('/api/connect?addr='+addr);
    const body = await response.json();
    console.log(body);

    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  let createWallet = async (password) => {
    const response = await fetch('/api/createWallet?password='+password);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log(body.wallet);
    return body;
  };


var APIs = {
  getBalance: getBalance,
  getInfo: getInfo,
  getChannels: getChannels,
  openChannel: openChannel,
  genInvoice: genInvoice,
  connectPeer: connectPeer,
  createWallet: createWallet
}

export default APIs;
