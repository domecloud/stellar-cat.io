const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
const account = 'GCRZEJLV5HCNHM2ZKIGYAHLXXES4TKHUHHQCL2YHDEWACL7MW5IU674J'
const publicKey = 'GCRZEJLV5HCNHM2ZKIGYAHLXXES4TKHUHHQCL2YHDEWACL7MW5IU674J'

server.loadAccount(publicKey).then((account) => {
  account.balances.forEach((balance) => {
    let token = '10000.0000000';
    $('#balanceAll').text(token)
    $('#pay').text((Number(token) - balance.balance).toFixed(7))
    $('#balance').text(balance.balance)
  });
});