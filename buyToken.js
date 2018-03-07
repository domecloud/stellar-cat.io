var StellarSdk;
document.querySelector('#buyToken').addEventListener('submit', (e) => {
    $('#buyTokenButton').attr('disabled','disabled')
    $('#buyTokenButton').text('รอสักครู่')
    e.preventDefault()
    var destinationId = $('#userAccount').val();
    var amount = $('#token').val();
    createTransection(destinationId, amount);
})

const createTransection = (destinationId, amount) => {

    var FromSecret = 'SB7IDGP3OUG52ZFWH6SZKPXMOICY76BRDQQZ3AZBT24T5LWVZJKYJVSA'
    StellarSdk.Network.useTestNetwork();
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    var sourceKeys = StellarSdk.Keypair
        .fromSecret(FromSecret);
    var transaction;

    server.loadAccount(destinationId)
        .then(() => {
            return server.loadAccount(sourceKeys.publicKey());
        })
        .then((sourceAccount) => {
            transaction = new StellarSdk.TransactionBuilder(sourceAccount)
                .addOperation(StellarSdk.Operation.payment({
                    destination: destinationId,
                    asset: StellarSdk.Asset.native(),
                    amount: String(amount)
                }))
                .addMemo(StellarSdk.Memo.text('Test Transaction'))
                .build();
            transaction.sign(sourceKeys);
            return server.submitTransaction(transaction);
        })
        .then((result) => {
            swal({
                title: 'การสั่งซื้อโทเคนสำเร็จ',
                icon: 'success'
            }).then(()=> {
                setTimeout(() => {
                    window.location = 'token.html'
                }, 500);
            })
            $('#buyTokenButton').attr('disabled',false)
            $('#buyTokenButton').text('ยืนยันการสั่งซื้อ')
        })
        .catch((error) => {
            swal({
                title: 'การสั่งซื้อโทเคนล้มเหลว',
                icon: 'warning'
            }).then(()=> {
                setTimeout(() => {
                    window.location = 'token.html'
                }, 500);
            })
        });
}