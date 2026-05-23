// Al caricamento della pagina, imposta la data di oggi nel calendario
window.onload = function() {
    const oggi = new Date();
    const anno = oggi.getFullYear();
    const mese = String(oggi.getMonth() + 1).padStart(2, '0');
    const giorno = String(oggi.getDate()).padStart(2, '0');
    
    document.getElementById('data-ricerca').value = `${anno}-${mese}-${giorno}`;
    
    // Mostra subito le notizie di oggi
    aggiornaRassegna();
};

function aggiornaRassegna() {
    const prov = document.getElementById("provincia").value;
    const giornaleCodice = document.getElementById("giornale").value;
    const giornaleNome = document.getElementById("giornale").options[document.getElementById("giornale").selectedIndex].text;
    const dataSelezionata = document.getElementById("data-ricerca").value;
    const feedContainer = document.getElementById("news-feed");

    if (!dataSelezionata) {
        feedContainer.innerHTML = "<p style='text-align:center;'>Seleziona una data valida.</p>";
        return;
    }

    // Formattiamo la data per renderla leggibile a schermo (es: 23/05/2026)
    const dataFormattata = dataSelezionata.split('-').reverse().join('/');

    // Aggiorna la data segreta usata nell'intestazione di stampa
    document.getElementById("print-meta-date").textContent = `Provincia: ${prov === "RC" ? "Reggio Calabria" : "Messina"} | Giornale: ${giornaleNome} | Data: ${dataFormattata}`;

    feedContainer.innerHTML = "<p style='text-align:center;'>Consultazione archivio cartaceo...</p>";

    // Generatore automatico di notizie per simulare qualsiasi data passata o presente
    setTimeout(() => {
        let notizieDelGiorno = [];

        if (prov === "RC") {
            notizieDelGiorno = [
                {
                    sezione: "CRONACA LOCALE",
                    titolo: `Reggio, piano straordinario di rifacimento asfalto sulle arterie interne`,
                    riassunto: `L'edizione odierna riporta il piano varato ieri sera dal Comune. I lavori partiranno dalle zone periferiche nord e sud per poi convergere verso il centro storico. Stanziati fondi speciali.`
                },
                {
                    sezione: "POLITICA & ECONOMIA",
                    titolo: `Porto di Gioia Tauro: i dati della camera di commercio registrano un aumento dei transiti`,
                    riassunto: `Analisi dettagliata sulla situazione occupazionale e logistica dello scalo. Le merci movimentate crescono del 4% rispetto al trimestre precedente, buone prospettive per l'indotto.`
                },
                {
                    sezione: "ATTUALITÀ",
                    titolo: `Restauro conservativo per i monumenti della Villa Comunale`,
                    riassunto: `Al via la pulizia delle statue storiche e la sistemazione dei vialetti interni. Gli storici dell'arte locali plaudono all'iniziativa di salvaguardia della memoria cittadina.`
                },
                {
                    sezione: "SPORT CALABRIA",
                    titolo: `Domenica decisiva nei campionati dilettantistici della provincia`,
                    riassunto: `Focus e classifiche sulle sfide calde della domenica calcistica provinciale. Tutti i campi e gli orari dei match di cartello.`
                }
            ];
        } else {
            // Se la provincia è Messina (ME)
            notizieDelGiorno = [
                {
                    sezione: "CRONACA LOCALE",
                    titolo: `Messina, interventi di bonifica idrica nella zona sud della città`,
                    riassunto: `I tecnici dell'AMAM aprono nuovi cantieri per la sostituzione delle condotte obsolete. Previste interruzioni programmate della distribuzione dell'acqua nelle ore notturne.`
                },
                {
                    sezione: "POLITICA",
                    titolo: `Consiglio a Palazzo Zanca: discussione accesa sui servizi sociali di Messina`,
                    riassunto: `Il dibattito si focalizza sui fondi per l'assistenza domiciliare agli anziani e il trasporto dei disabili. La delibera passa con modifiche strutturali volute dall'opposizione.`
                },
                {
                    sezione: "ATTUALITÀ & CULTURA",
                    titolo: `L'Archivio di Stato di Messina mostra i documenti pre-terremoto`,
                    riassunto: `Una mostra straordinaria espone mappe, registri commerciali e lettere risalenti a prima del 1908. Un'occasione per riscoprire la pianta urbana originaria della città.`
                },
                {
                    sezione: "SPORT SICILIA",
                    titolo: `Messina Volley prepara la trasferta decisiva di campionato`,
                    riassunto: `Dichiarazioni dell'allenatore alla vigilia della partenza. La squadra cerca la vittoria esterna per blindare la salvezza matematica.`
                }
            ];
        }

        // Stampiamo le notizie trovate nell'interfaccia dell'app
        feedContainer.innerHTML = "";
        
        notizieDelGiorno.forEach(notizia => {
            const card = document.createElement("div");
            card.className = "news-card";
            card.innerHTML = `
                <div class="meta-info">FOGLIO CARTACEO — Sezione: ${notizia.sezione} — Edizione del ${dataFormattata}</div>
                <h3>${notizia.titolo}</h3>
                <p><strong>Riassunto della redazione:</strong> ${notizia.riassunto}</p>
            `;
            feedContainer.appendChild(card);
        });

    }, 300);
}

// Questa funzione attiva il comando di stampa nativo del telefono o del PC
function avviaStampa() {
    window.print();
}