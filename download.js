
chain = {
    main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // main network
    jungle: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', // jungle testnet
    sys: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
}


eos = Eos({

    httpEndpoint: 'http://mainnet.eoscalgary.io:80',
    chainId: chain.main
});
async function loadFile(){
    let File ="";
    let options = {json:true, scope: "paranthropus", code: "paranthropus", table: "files", limit:16};
    let fileParts = await eos.getTableRows(options);


    for(let row of fileParts.rows){

        File+=row.data;
    }

    download("Pan-Homo split via Gorilla introgression.pdf",File);
}
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}


function download(filename, data) {
    let file;
    var properties = {type: 'application/pdf'}; // Specify the file's mime-type.
    try {
        // Specify the filename using the File constructor, but ...
        file = new File(data, "so ", properties);
    } catch (e) {
        // ... fall back to the Blob constructor if that isn't supported.
        file = b64toBlob([data], properties);
    }
    var url = URL.createObjectURL(file);
    console.log(url);
    document.getElementById('link').href = url;
    document.getElementById('object').setAttribute('data', "data:application/pdf;base64,"+data);

}

loadFile();