window.onload = function() {
    // Imposta automaticamente il calendario sulla data odierna all'avvio
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

    // Scomponiamo la data nei singoli elementi (Anno, Mese, Giorno)
    const partiData = dataSelezionata.split('-'); // Risultato: [AAAA, MM, GG]
    const anno = partiData[0];
    const mese = partiData[1];
    const giorno = partiData[2];
    const dataFormattata = `${giorno}/${mese}/${anno}`;

    // Aggiorna i testi descrittivi sopra i pulsanti dell'interfaccia
    document.getElementById("gds-target-date").textContent = `Notizie online pubblicate il ${dataFormattata}`;
    document.getElementById("ls-target-date").textContent = `Articoli d'archivio web del ${dataFormattata}`;

    // 1. GENERAZIONE LINK REALE: GAZZETTA DEL SUD (Edizione Messina / Reggio)
    // Il server di Gazzetta del Sud indicizza l'archivio web con la struttura /archivio/anno/mese/giorno/
    let urlGdsLocale = "https://messina.gazzettadelsud.it";
    if (prov === "RC") {
        urlGdsLocale = "https://reggio.gazzettadelsud.it";
    }
    
    // Costruiamo l'URL esatto che punta alla cartella del giorno sul loro server
    document.getElementById("link-gds").href = `${urlGdsLocale}/archivio/${anno}/${mese}/${giorno}/`;


    // 2. GENERAZIONE LINK REALE: LA SICILIA
    // Il motore di ricerca del sito La Sicilia filtra l'archivio locale tramite query string
    // Passiamo la data in formato AAAA-MM-GG e blocchiamo l'edizione sulla provincia scelta
    let edizioneLs = "messina";
    if (prov === "RC") {
        edizioneLs = "calabria"; // La Sicilia accorpa la cronaca reggina sotto l'edizione Calabria
    }

    const urlLsLocale = "https://www.lasicilia.it/ricerca/";
    
    // Costruiamo l'URL di ricerca reale iniettando data e area geografica
    document.getElementById("link-ls").href = `${urlLsLocale}?date=${anno}-${mese}-${giorno}&edition=${edizioneLs}`;
}