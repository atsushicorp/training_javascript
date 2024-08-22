const rootElm = document.getElementById('areaSelector');

async function initAreaSelector(){
    await updatePref();
    await updateCity();
}

async function getPrefs(){
    const prefResponse = await fetch('./prefectures.json');
    return prefResponse.json();
}

async function getCities(prefcode){
    const cityResponse = await fetch(`./cities/${prefcode}.json`);
    return cityResponse.json();
}

async function updatePref(){
    const prefs = await getPrefs();
    createPrefOptionsHtml(prefs);
}

async function updateCity(){
    const prefSelectorElm = rootElm.querySelector('.prefectures');
    const cities = await getCities(prefSelectorElm.value);
    createCityOptionsHtml(cities);
}

function createPrefOptionsHtml(prefs){
    const optionsStr = [];
    for(const pref of prefs){
        optionsStr.push(`
            <option name="${pref.name}" value="${pref.code}">
                ${pref.name}
            </option>
        `);
    }

    const prefSelectorElm = rootElm.querySelector('.prefectures');
    prefSelectorElm.innerHTML= optionsStr.join('');

    prefSelectorElm.addEventListener('change',(event)=>{
        updateCity();
    });
}

function createCityOptionsHtml(cities){
    const optionStr = [];
    for (const city of cities){
        optionStr.push(`
            <option name="${city.name}" value="${city.code}">
                ${city.name}
            </option>
        `);
    }

    const citySelectorElm = rootElm.querySelector('.cities');
    citySelectorElm.innerHTML = optionStr.join('');
}

//実行
//updatePref();
initAreaSelector();

/*
async function displayPrfs(){
    const result = await getPrefs();
    console.log(result);
}

displayPrfs();
*/