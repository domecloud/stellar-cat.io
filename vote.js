var StellarSdk;
var allCatId = [
    'GBFMK53DB7ZZGZIJVPC6H67GG6ZYE4EILC6KGA6IYZ7AZLDHMZ5JWCSC',
    'GBATTAYJX2X742HISL6SLW3DPBZRPQCJBMXD3PF3EUGEIN7GG6LY7M63',
    'GBT3UZU32UQ3WKGOAML5UVHWXRJTNMTY36Z5J4IMCHKKYB6VSSSVKHOG',
    'GB6I5OFUFVOIDMWPL3AVZXUHZNBYHU7LQ6N7O7LYUSLG6D44EFSDGGT3'
]
allCatId.map((item, i) => {
    axios({
        method: 'get',
        url: 'https://horizon-testnet.stellar.org/accounts/' + item + '/transactions',
    }).then((response) => {
        let score = (response.data._embedded.records.length - 1)
        var card = document.createElement('div');
        card.className = "col-sm-3 card-cat"
        card.innerHTML = `
        <div class="card">
            <img class="card-img-top" height="180" src="img/cat${i+1}.jpg"
                alt="Card image cap">
            <div class="card-block">
                <h4 class="card-title text-center">แมว ${i+1}</h4>
                <h5 class="card-title text-center">คะแนน
                    <span>${score}</span>
                </h5>
                <button onclick="cat(${i+1})" id="voteCat${i+1}" class="btn btn-info btn-block" style="padding:5px">โหวต</button>
            </div>
        </div>
        `
        $("#catCard").append(card);
    })
})

const cat = (id) => {
    let catId;
    let catName = id;
    switch (id) {
        case 1:
            catId = 'GBFMK53DB7ZZGZIJVPC6H67GG6ZYE4EILC6KGA6IYZ7AZLDHMZ5JWCSC'
            vote(catId,id)
            break;
        case 2:
            catId = 'GBATTAYJX2X742HISL6SLW3DPBZRPQCJBMXD3PF3EUGEIN7GG6LY7M63'
            vote(catId,id)
            break;
        case 3:
            catId = 'GBT3UZU32UQ3WKGOAML5UVHWXRJTNMTY36Z5J4IMCHKKYB6VSSSVKHOG'
            vote(catId,id)
            break;
        case 4:
            catId = 'GB6I5OFUFVOIDMWPL3AVZXUHZNBYHU7LQ6N7O7LYUSLG6D44EFSDGGT3'
            vote(catId,id)
            break;
        default:
            console.log('error')

    }
}

const vote = (catId,id) => {
    $('#sendTo').val(catId)
    $('#sendTo').attr('title', catId)
    $('#catName').text('แมว'+id)
    $('#exampleModal').modal('show')
    document.querySelector('#confirmVote').addEventListener('click', (e) => {
        $('#confirmVote').text('รอสักครู่')
        $('#confirmVote').attr('disabled','disabled')
        e.preventDefault()
        const secretKey = $('#fromTo').val()
        createTransection(catId, secretKey);
    })
}


const createTransection = (catId, secretKey) => {
    StellarSdk.Network.useTestNetwork();
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    var sourceKeys = StellarSdk.Keypair
        .fromSecret(secretKey);
    var transaction;

    server.loadAccount(catId)
        .then(() => {
            return server.loadAccount(sourceKeys.publicKey());
        })
        .then((sourceAccount) => {
            transaction = new StellarSdk.TransactionBuilder(sourceAccount)
                .addOperation(StellarSdk.Operation.payment({
                    destination: catId,
                    asset: StellarSdk.Asset.native(),
                    amount: String(1)
                }))
                .addMemo(StellarSdk.Memo.text('Test Transaction'))
                .build();
            transaction.sign(sourceKeys);
            return server.submitTransaction(transaction);
        })
        .then((result) => {
            swal({
                title: 'การโหวตสำเร็จ',
                icon: 'success'
            }).then(() => {
                setTimeout(() => {
                    window.location = 'vote.html'
                }, 500);
            })
            $('#buyTokenButton').attr('disabled', false)
            $('#buyTokenButton').text('ยืนยันการสั่งซื้อ')
        })
        .catch((error) => {
            swal({
                title: 'การโหวล้มเหลว',
                icon: 'warning'
            }).then(() => {
                setTimeout(() => {
                    window.location = 'vote.html'
                }, 500);
            })
        });
}