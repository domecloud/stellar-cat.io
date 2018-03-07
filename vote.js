var StellarSdk;
var allCatId = [
    'GAFGNH2YDVUFSMVURXFANVFAWGA3KYD5K642TG47OTXP6MSMSWJQY2UR',
    'GAVQ6VT4PYVGIUOB3KXBJPGRZJDRQYTHCNNS5AF7EPZXUA4T7E23VYRD',
    'GAZFHHKGPUZMGZ4XQLUOEHWJOMQKFTN2LNFYQNBXUJRJSHVNOEMNOOAY',
]
allCatId.map((item, i) => {
    axios({
        method: 'get',
        url: 'https://horizon.stellar.org/accounts/' + item + '/transactions',
    }).then((response) => {
        let score = (response.data._embedded.records.length - 1)
        var card = document.createElement('div');
        card.className = "col-sm-4 card-cat"
        card.innerHTML = `
        <div class="card">
            <img class="card-img-top" height="230" src="img/cat${i+1}.jpg"
                alt="Card image cap">
            <div class="card-block">
                <h4 class="card-title text-center">แมว ${i+1}</h4>
                <h5 class="card-title text-center">
                    <span>${score}</span>
                    คะแนน
                </h5>
                <button onclick="cat(${i+1})" id="voteCat${i+1}" class="btn btn-info btn-block" style="padding:5px">โหวต</button>
            </div>
        </div>
        `
        $('.page-loader-wrapper').fadeOut();
        $("#catCard").append(card);
    })
})

const cat = (id) => {
    let catId;
    let catName = id;
    switch (id) {
        case 1:
            catId = 'GAFGNH2YDVUFSMVURXFANVFAWGA3KYD5K642TG47OTXP6MSMSWJQY2UR'
            vote(catId,id)
            break;
        case 2:
            catId = 'GAVQ6VT4PYVGIUOB3KXBJPGRZJDRQYTHCNNS5AF7EPZXUA4T7E23VYRD'
            vote(catId,id)
            break;
        case 3:
            catId = 'GAZFHHKGPUZMGZ4XQLUOEHWJOMQKFTN2LNFYQNBXUJRJSHVNOEMNOOAY'
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
    document.querySelector('#confirmVoteForm').addEventListener('submit', (e) => {
        $('#confirmVote').text('รอสักครู่')
        $('#confirmVote').attr('disabled','disabled')
        e.preventDefault()
        const secretKey = $('#fromTo').val()
        createTransection(catId, secretKey);
    })
}


const createTransection = (catId, secretKey) => {
    StellarSdk.Network.usePublicNetwork();
    var server = new StellarSdk.Server('https://horizon.stellar.org');
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
                    amount: String(0.1)
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