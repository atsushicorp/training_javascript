function fetchHello(){
    const promise = fetch('./hello.json');

    const onFulfilled = (data) => {
        console.log('通信成功しました。');
    }

    const onRejected = (err) => {
        console.log('通信失敗しました。');
    }

    //fetch関数の成功、失敗により呼ばれる切り替わるプロミスオブジェクトは通信、通信成功、通信失敗のフェーズがある。
    return promise.then(onFulfilled, onRejected);
}