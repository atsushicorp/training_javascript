class AreaSelector{
    constructor(rootElm){
        this.rootElm = rootElm;
        this.rePrefectures = [];
        this.reCities = [];
        this.prefCode = '001';
    }

    async init(){
        //await this.reUpdatePref();
        //await this.reUpdateCity();
        await this.waitMultiple();
    }

    async waitMultiple(){
        const promises = [
            this.reUpdatePref(),
            this.reUpdateCity(),
        ]

        const exeute = await Promise.all(promises);
    }

    reUpdatePref(){
        return fetch('./prefectures.json').then((reponse)=>{
            return reponse.json().then((data)=>{
                this.rePrefectures = data;
                this.prefCode = data[0].code;
                this.createPrefOptionHtml();
            }).catch((err)=>{
                console.log(`通信エラーが発生しました。${err}`);
            });
        });
    }

    reUpdateCity(){
        return fetch(`./cities/${this.prefCode}.json`).then((response)=>{
            return response.json().then((data)=>{
                this.reCities = data;
                this.createCityOptionHtml();
            }).catch((err)=>{
                console.log(`通信エラーが発生しました。${err}`);
            });
        });
    }


    createPrefOptionHtml(){
        const prefSelectorElm = this.rootElm.querySelector('.prefectures');
        prefSelectorElm.innerHTML = this.toOptionHtml(this.rePrefectures);

        prefSelectorElm.addEventListener('change',(event)=>{
            //イベントが発生した要素のプロパティの値を取得
            this.prefCode = event.target.value;
            this.reUpdateCity();
        });
    }

    createCityOptionHtml(){
        const citySelectorElm = this.rootElm.querySelector('.cities');
        citySelectorElm.innerHTML = this.toOptionHtml(this.reCities);
    }



    toOptionHtml(records){
        const objRecord = records.map(function(record){
            return `
                <option name="${record.name}" value="${record.code}">
                ${record.name}
                </option>
            `;
        });

        return objRecord.join();
        
    }
}

const areaSelector = new AreaSelector(document.getElementById('areaSelector'));
areaSelector.init();