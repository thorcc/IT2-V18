// Referanser til html-elementer
const btnSpill = document.querySelector("#btnSpill");
const divInstrumenter = document.querySelector("#divInstrumenter");
const lyd = document.querySelector("#lyd");
const lydRett = document.querySelector("#lydRett");
const lydFeil = document.querySelector("#lydFeil");
const spAntGjett = document.querySelector("#spAntGjett");

// Globale variabler
const startInstrumenter = ["fagott", "floyte", "klarinett", "obo", "valthorn"];
let instrumenter = [ ...startInstrumenter ]; // kopierer startInstrumenter
let spillIndex = 0;
let antallGjett = 0;
let antallFeil = 0;
let totaltAntallGjett = 0;
let highscore = Infinity; // Setter highscoren til uendelig i starten

function lagHTML(){
    // Funksjon som lager HTML for instrumentene som er igjen

    divInstrumenter.innerHTML = ""; // Fjerner innholdet i divInstrumenter
    // Går gjennom instumenter-listen og Lager html for instumentene som er igjen
    for(let i = 0; i < instrumenter.length; i += 1){
        divInstrumenter.innerHTML += `
            <div onclick=gjett(${i})>
                <h2>${instrumenter[i]}</h2>
                <img src="bilder/${instrumenter[i]}.jpg">
            </div>
        `;
    }
}

function nyttInstrument(){
    // Funksjon som velger et nytt tilfeldig instrument,
    // og setter antallGjett til 0
    spillIndex = Math.floor(Math.random() * instrumenter.length);
    antallGjett = 0; 
}

function oppdaterLydOgSpill(){
    // Funksjon som setter ny src, og spiller lyd
    lyd.src = `lyder/${instrumenter[spillIndex]}.mp3`;
    lyd.play();  
}

function riktig(index){
    lyd.pause();
    instrumenter.splice(index, 1); // fjerner instrumentet fra instrumentlisten
    antallGjett = 0;
    lydRett.play();
    nyttInstrument();
    
    if(instrumenter.length > 0){
        lagHTML();
    }
    else{
        lagSluttskjerm();
    }
}

function galt(){
    antallGjett += 1;
    antallFeil += 1;
    console.log(antallFeil);
    lydFeil.play();
}

function oppdaterTellere(){
    totaltAntallGjett += 1;
    spAntGjett.innerHTML = antallGjett;
    spTotGjett.innerHTML = totaltAntallGjett;
}

function gjett(index){
    if(spillIndex === index){
        riktig(index); 
    }
    else{
        galt();
    }
    oppdaterTellere();
}

function lagSluttskjerm(){

    let beskjed = "";
    console.log(antallFeil);
    if(antallFeil === 0){
        beskjed = "Gratulerer! Du hadde 0 feil!";
    }
    else{
        beskjed = `Du fikk ${antallFeil} feil.`;
    }
    if(antallFeil < highscore){
        highscore = antallFeil;
        beskjed += " Ny rekord!"
    }
    beskjed += `<button onclick="restart()">Spill igjen!</button>`
    divInstrumenter.innerHTML = beskjed;

    btnSpill.disabled = true; // Gjør at spillknappen ikke kan trykkes på
}

function restart(){
    instrumenter = [ ...startInstrumenter ]; // kopierer startInstrumenter
    
    // Resetter globale variable som holder kontroll på poeng
    antallGjett = 0;
    antallFeil = 0;
    totaltAntallGjett = 0;


    nyttInstrument();
    lagHTML();
    btnSpill.disabled = false; // Gjør at spillknappen kan trykkes på
}

// Hendelser
btnSpill.onclick = oppdaterLydOgSpill;

// Oppstart
nyttInstrument();
lagHTML();