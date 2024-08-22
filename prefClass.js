class AreaSelector{
    constructor(rootElm){
        this.rootElm = rootElm;
        this.prefectures = [];
        this.cities = [];
        this.prefCode = null;
    }

    async init(){
        await this.updatePref();
        await this.updateCity();
    }

    async getPref(){
        const prefResponse = await fetch('./prefectures.json');
        return prefResponse.json();
    }

    async getCities(prefCode){
        const cityResponse = await fetch(`./cities/${prefCode}.json`);
        return cityResponse.json();
    }

    async updatePref(){
        this.prefectures = await this.getPref();
        //インスタンス変数へ都道府県コードを代入
        this.prefCode = this.prefectures[0].code;
        this.createPrefOptionHtml();
    }

    async updateCity(){
        this.cities = await this.getCities(this.prefCode);
        this.createCityOptionHtml();
    }

    createPrefOptionHtml(){
        const prefSelectorElm = this.rootElm.querySelector('.prefectures');
        prefSelectorElm.innerHTML = this.toOptionHtml(this.prefectures);

        prefSelectorElm.addEventListener('change',(event)=>{
            //イベントが発生した要素のプロパティの値を取得
            this.prefCode = event.target.value;
            this.updateCity();
        });
    }

    createCityOptionHtml(){
        const citySelectorElm = this.rootElm.querySelector('.cities');
        citySelectorElm.innerHTML = this.toOptionHtml(this.cities);
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
        /*
        return records.map((record)=>{
            return `
                <option name
            `;
        }).json();
        */
    }
}

const areaSelector = new AreaSelector(document.getElementById('areaSelector'));
areaSelector.init();