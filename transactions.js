const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
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
            $('#balanceToken').text(balance.balance + ' โทเคน')
            $('#cardBalanceToken').show();
            $('#searchTransection').text('ตรวจสอบ')
            $('#searchTransection').attr('disabled', false)
        });
    })

    axios({
        method: 'get',
        url: 'https://horizon-testnet.stellar.org/accounts/'+publick_key+'/transactions',
    }).then((response) => {
        console.log(response.data)
    })

}