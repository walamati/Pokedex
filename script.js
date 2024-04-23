let startResponseToJson = [];
let allRenderPokemonAPIs = [];
let allRenderSinglePokemonAPIs = [];
let colorForSpecies = [];
let allRenderPokemonSpecies = [];
let currentIndex = 0;

async function init() {
    await loadPokemonsAPIs();
    console.log(this);
}

async function loadPokemonsAPIs() {
    let responseToJson = await (await fetch(`https://pokeapi.co/api/v2/pokemon`)).json(); 
    await loadSinglePokemonAPIs(responseToJson)
    startResponseToJson.push(responseToJson)
}

async function loadSinglePokemonAPIs(responseToJson) {
    for (let i = 0; i < responseToJson['results'].length; i++) {
        const singlePokemonAPIs = responseToJson['results'][i]['url'];
        allRenderPokemonAPIs.push(singlePokemonAPIs)
    }
    await loadSinglePokemon();
    await loadSinglePokemonSpecies();
}

async function loadSinglePokemon(){
    for (let i = 0; i < allRenderPokemonAPIs.length; i++) {
        let responseToJson = await (await fetch(allRenderPokemonAPIs[i])).json();
        allRenderSinglePokemonAPIs.push(responseToJson);
    }
    await renderPokemon();
}

async function loadSinglePokemonSpecies() {
    for (let i = 0; i < allRenderSinglePokemonAPIs.length; i++) {
        let responseToJson = await (await fetch(allRenderSinglePokemonAPIs[i]['species']['url'])).json();
        allRenderPokemonSpecies.push(responseToJson);
    }
}

async function loadMore() {
    try { 
        let body = document.getElementById('body').classList.add('hidden');
        await loadSinglePokemonSpecies();
        let loadAnimtion = document.getElementById('loadAnimation').classList.remove('none');
        let responseToJson = await (await fetch(startResponseToJson['0'].next)).json();
        startResponseToJson.splice(0, 1);
        startResponseToJson.push(responseToJson);
        Array.prototype.push.apply(allRenderPokemonAPIs, responseToJson['results'].map(result => result['url']));
        allRenderSinglePokemonAPIs.length = 0;
        await loadSinglePokemon();
    } finally { 
        let loadAnimtion = document.getElementById('loadAnimation').classList.add('none');
        let body = document.getElementById('body').classList.remove('hidden');
    } 
}

async function renderPokemon() {
    let pokemonGallery = document.getElementById('pokemonGallery');
    pokemonGallery.innerHTML = '';
    colorForSpecies.length = 0;
    for (let i = 0; i < allRenderSinglePokemonAPIs.length; i++) {
        let singlePokemon = allRenderSinglePokemonAPIs[i];
        await pokemonColor(singlePokemon);
        pokemonGallery.innerHTML += renderPokemonHtml(singlePokemon, i);
    }
}

async function pokemonColor(singlePokemon){
    let responseToJson = await (await fetch(singlePokemon['species']['url'])).json();
    colorForSpecies.push(responseToJson['color']['name']);
}

function pokemonSearch() {
    let pokemonSearchInput = document.getElementById('pokemonSearchId').value.toLowerCase();
    console.log(pokemonSearchInput)
    let pokemonGallery = document.getElementById('pokemonGallery');
    pokemonGallery.innerHTML = '';
    for (let i = 0; i < allRenderSinglePokemonAPIs.length; i++) {
        let singlePokemon = allRenderSinglePokemonAPIs[i];
        if (allRenderSinglePokemonAPIs[i]['name'].toLowerCase().startsWith(pokemonSearchInput)) {
            pokemonGallery.innerHTML += renderPokemonHtml(singlePokemon, i);
        }
    }
}

function singlePokemonInDetail(i) {
    let body = document.getElementById('body').classList.add('hidden');
    let singlePokemon = allRenderSinglePokemonAPIs[i];
    let pokemonInDetail = document.getElementById('pokemonInDetail');
    pokemonInDetail.classList.remove('none');
    pokemonInDetail.innerHTML = singlePokemonInDetailHTML(singlePokemon, i);
    renderChart(singlePokemon, i);
    currentIndex = i;
}

function addNone() {
    let body = document.getElementById('body').classList.remove('hidden');
    let pokemonInDetail = document.getElementById('pokemonInDetail');
    pokemonInDetail.classList.add('none');
}

function pokemonAbout(i) {
    let singlePokemonSpecies = allRenderPokemonSpecies[i];
    let pokemonAbout = document.getElementById('pokemonAbout');
    let myChart = document.getElementById('myChart');
    myChart.classList.add('none');
    pokemonAbout.classList.remove('none')
    pokemonAbout.innerHTML = pokemonAboutHTML(singlePokemonSpecies);
}

function pokemonData() {
    let pokemonAbout = document.getElementById('pokemonAbout');
    pokemonAbout.classList.add('none')
    let myChart = document.getElementById('myChart');
    myChart.classList.remove('none');
}

function buttonForLast() {
    if (currentIndex === 0) {
        currentIndex = allRenderSinglePokemonAPIs.length -1;
        singlePokemonInDetail(currentIndex);
    } else{
        currentIndex = (currentIndex - 1) % allRenderSinglePokemonAPIs.length;
        singlePokemonInDetail(currentIndex);
    } 
}

function buttonForNext() {
    currentIndex = (currentIndex + 1) % allRenderSinglePokemonAPIs.length;
    singlePokemonInDetail(currentIndex);
}

