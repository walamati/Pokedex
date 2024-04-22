function renderPokemonHtml(singlePokemon, i){
    let htmlCode = /*html */ `<div class="singlePokemon" style="background: ${colorForSpecies[i]}" onclick="singlePokemonInDetail(${i})">`;
    if (colorForSpecies[i] == 'black') {
        htmlCode += /*html */ `<div class="pokemonId"><h2 style="color: white">${singlePokemon['name']}</h2><h2 style="color: white">#${singlePokemon['id']}</h2></div>`;
    } else {htmlCode += /*html */ `<div class="pokemonId"><h2>${singlePokemon['name']}</h2><h2>#${singlePokemon['id']}</h2></div>`;
    }   
    htmlCode += /*html */ `<div class="shortInfoPokemon">`;
    htmlCode += /*html */ `<div class="pokemonType">`;
    for (let index = 0; index < singlePokemon['types'].length; index++) {
        htmlCode += /*html */ `<div class="singlePokemonType">${singlePokemon['types'][index]['type']['name']}</div>`;
    }
    htmlCode += /*html */ `</div>`;
    htmlCode += /*html */ `<img src="${singlePokemon['sprites']['other']['official-artwork']['front_default']}" alt="">`;
    htmlCode += /*html */ `</div>`;
    htmlCode += /*html */ `</div>`;
    return htmlCode;
}

function singlePokemonInDetailHTML(singlePokemon, i){
    let htmlCode = /*html */ `<div onclick="event.stopPropagation();" class="wholePokemonCard"><button class="buttonFor" onclick="buttonForLast()"><</button>`;
    htmlCode += /*html */ `<div style="background: ${colorForSpecies[i]}" class="singlePokemonInDetail">`;
    if (colorForSpecies[i] == 'black') {
        htmlCode += /*html */ `
            <div style="color: white" class="pokemonName">
            <h1>${singlePokemon['name']}</h1>
            <h3>#${singlePokemon['id']}</h3>
        </div>`;
    } else {
        htmlCode += /*html */ `
        <div class="pokemonName">
            <h1>${singlePokemon['name']}</h1>
            <h3>#${singlePokemon['id']}</h3>
        </div>`;
    }
    htmlCode += /*html */ `<div class="pokemonAbilities">`;
   for (let j = 0; j < singlePokemon['abilities'].length; j++) {
        htmlCode += /*html */ `<div class="singlePokemonAbilities">${singlePokemon['abilities'][j]['ability']['name']}</div>`;
   }
    htmlCode += /*html */ `</div>`;
    htmlCode += /*html */ `<img src="${singlePokemon['sprites']['other']['official-artwork']['front_default']}" alt="">`;
    htmlCode += /*html */ `
    <div class="details">
        <div>
            <button class="buttonAboutPokemon" onclick="pokemonData()">Data</button>
            <button class="buttonAboutPokemon" onclick="pokemonAbout(${i})">About</button>
        </div>
        <div class="pokemonAbout" id="pokemonAbout"></div>
        <canvas class="detailChart" id="myChart"></canvas>
    </div>`;
    htmlCode += /*html */ `</div><button class="buttonFor" onclick="buttonForNext()">></button></div>`;
    return htmlCode;
}

function pokemonAboutHTML(singlePokemon){
    let htmlCode = /*html */ `
    <div class="allDataPoints">
        <div class="dataPoints">
            <span>Color:</span>
            <span>Base Happiness:</span>
            <span>Egg Groups:</span>
            <span>Growth Rate:</span>
            <span>Habitat:</span>
            <span><b>Story:</b></span>
        </div>          
    `;
    htmlCode += /*html */ `
        <div class="dataPointsAnswer">
            <span>${singlePokemon['color']['name']}</span>
            <span>${singlePokemon['base_happiness']}</span>
    `;
    htmlCode += /*html */ `<div>`;
    for (let i = 0; i < singlePokemon['egg_groups'].length; i++) {
        htmlCode += /*html */ `
                <span>${singlePokemon['egg_groups'][i]['name']}</span>
    `;
    }
    htmlCode += /*html */ `</div>`;
    htmlCode += /*html */ `
            <span>${singlePokemon['growth_rate']['name']}</span>
            <span>${singlePokemon['habitat']['name']}</span>
        </div>
    `;
    htmlCode += /*html */ `</div>`;
    htmlCode += /*html */ `
    <div class="pokemonSingleAbout">
        ${singlePokemon['flavor_text_entries']['25']['flavor_text']}
        ${singlePokemon['flavor_text_entries']['33']['flavor_text']}
        ${singlePokemon['flavor_text_entries']['41']['flavor_text']}
        ${singlePokemon['flavor_text_entries']['58']['flavor_text']}
    </div>
    `;
    return htmlCode;
}

