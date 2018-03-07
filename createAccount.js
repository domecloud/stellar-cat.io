var StellarSdk

document.querySelector('#createAccount').addEventListener('submit', (e) => {
    var pair = StellarSdk.Keypair.random();

const secretKey = pair.secret();
const publicKey = pair.publicKey();
    e.preventDefault();
    $('#createButton').attr("disabled","disabled")
    $('#createButton').text('รอสักครู่')
    createAccount(secretKey, publicKey)
})
const createAccount=(secretKey, publicKey)=> {

    $.ajax({
        method: "GET",
        url: "https://horizon-testnet.stellar.org/friendbot",
        data: { addr: publicKey}
      })
        .done((response) => {
          $('#publicKey').text(publicKey)
          $('#secretKey').text(secretKey)
          $('#createButton').attr("disabled",false)
          $('#createButton').text('สร้าง')
        });
}
