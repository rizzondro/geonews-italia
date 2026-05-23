window.onload = function() {
    // Inizializza il calendario sulla data odierna
    const oggi = new Date();
    const anno = oggi.getFullYear();
    const mese = String(oggi.getMonth() + 1).padStart(2, '0');
    const giorno = String(oggi.getDate()).padStart(2, '0');
    
    document.getElementById('data-ricerca').value = `${anno}-${mese}-${giorno}`;
    generazioneLink();
};

function generazioneLink() {
    const prov = document.getElementById("provincia").value;
    const dataSelezionata = document.getElementById("data-ricerca").value;

    if (!dataSelezionata) return;

    // Scomponiamo la data per i motori di ricerca dei siti
    const partiData = dataSelezionata.split('-'); // [AAAA, MM, GG]
    const anno = partiData[0];
    const mese = partiData[1];
    const giorno = partiData[2];
    const dataFormattata = `${giorno}/${mese}/${anno}`;

    // Aggiorna i testi descrittivi nelle schede dell'app
    document.getElementById("gds-target-date").textContent = `Edizione cartacea digitale del ${dataFormattata}`;
    document.getElementById("ls-target-date").textContent = `Edizione d'archivio del ${dataFormattata}`;

    // 1. GENERAZIONE LINK GAZZETTA DEL SUD
    // Il portale digitale Nozio/Gazzetta indicizza le edizioni d'archivio o l'e-paper tramite parametri di data
    const urlBaseGds = "https://gazzettadelsud.it/pagine/edicola-digitale/";
    // Costruiamo il link forzando i parametri temporali di ricerca se supportati in stringa query, altrimenti punta al selettore d'archivio ufficiale
    document.getElementById("link-gds").href = `${urlBaseGds}?date=${anno}-${mese}-${giorno}`;


    // 2. GENERAZIONE LINK LA SICILIA
    // Lo store de La Sicilia organizza l'archivio digitale sfogliabile secondo la struttura delle cartelle temporali dell'e-paper
    // Esempio url storico: store.lasicilia.it/lasicilia/publications?date=AAAA-MM-GG
    const urlBaseLs = "https://store.lasicilia.it/publications";
    document.getElementById("link-ls").href = `${urlBaseLs}?date=${anno}-${mese}-${giorno}`;
}