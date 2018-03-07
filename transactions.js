const server = new StellarSdk.Server('https://horizon.stellar.org');
document.querySelector('#checkTransaction').addEventListener('submit', (e) => {
    $('#searchTransection').text('รอสักครู่')
    $('#searchTransection').attr('disabled','disabled')
    e.preventDefault()
    const publick_key = $('#txtTransection').val()
    const account = publick_key;
    search(publick_key, account)
})
const search = (publick_key, account) => {
    server.loadAccount(publick_key).then((account) => {
        account.balances.forEach((balance) => {
            $('#balanceToken').text(balance.balance + ' lumens')
            $('#cardBalanceToken').show();
            $('#searchTransection').text('ตรวจสอบ')
            $('#searchTransection').attr('disabled', false)
        });
    })
}