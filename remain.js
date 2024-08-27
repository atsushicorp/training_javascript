function displayMessage(){
    return fetch('./hello.json').then((response)=>{
        console.log(response);
        //throw new Error('テストエラー');
        return response.json();
    }).then((data)=>{
        const messageElm = document.getElementById('message');
        messageElm.innerHTML = data.message;
    }).catch((err)=>{
        const errMsg = err;
        console.log(`通信失敗しました。：${errMsg}`);
    });
}

displayMessage();