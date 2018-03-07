const server = new StellarSdk.Server('https://horizon.stellar.org');
const account = 'GAZFHHKGPUZMGZ4XQLUOEHWJOMQKFTN2LNFYQNBXUJRJSHVNOEMNOOAY'
const publicKey = 'GAZFHHKGPUZMGZ4XQLUOEHWJOMQKFTN2LNFYQNBXUJRJSHVNOEMNOOAY'

server.loadAccount(publicKey).then((account) => {
  account.balances.forEach((balance) => {
    let token = '5.0000000';
    $('#balanceAll').text(token)
    $('#pay').text((Number(token) - balance.balance).toFixed(7))
    $('#balance').text(balance.balance)
  });
});