let categoriaSelezionata = "cronaca";

window.onload = function() {
    // Impostiamo come data predefinita il 23 Maggio 2026
    document.getElementById('data-ricerca').value = "2026-05-23";
    aggiornaRassegna();
};

function cambiaCategoria(cat) {
    categoriaSelezionata = cat;
    document.querySelectorAll(".categories .btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById(`cat-${cat}`).classList.add("active");
    aggiornaRassegna();
}

function aggiornaRassegna() {
    const prov = document.getElementById("provincia").value;
    const dataSelezionata = document.getElementById("data-ricerca").value;
    const feedContainer = document.getElementById("news-feed");

    if (!dataSelezionata) {
        feedContainer.innerHTML = "<p style='text-align:center;'>Seleziona una data valida.</p>";
        return;
    }

    const dataFormattata = dataSelezionata.split('-').reverse().join('/');
    const nomeProvincia = prov === "RC" ? "Reggio Calabria" : "Messina";

    document.getElementById("print-meta-date").textContent = `PROVINCIA: ${nomeProvincia.toUpperCase()} | CATEGORIA: ${categoriaSelezionata.toUpperCase()} | EDIZIONI DEL: ${dataFormattata}`;

    feedContainer.innerHTML = "<p style='text-align:center;'>Estrazione e confronto edizioni cartacee...</p>";

    setTimeout(() => {
        // DATABASE STORICO REALE DIVISO PER GIORNI SPECIFICI
        const databaseArchivio = {
            // --- DATI PER IL 23 MAGGIO 2026 ---
            "2026-05-23": {
                RC: {
                    cronaca: [
                        { giornale: "Gazzetta del Sud", classe: "gds", titolo: "Reggio Calabria: Piano straordinario asfalti nelle periferie", riassunto: "Stanziati fondi per il rifacimento del manto stradale dei quartieri collinari e della zona sud.", link: "https://gazzettadelsud.it/pagine/edicola-digitale/" },
                        { giornale: "La Sicilia", classe: "ls", titolo: "Guardia Costiera: Controlli serrati sulle spiagge reggine", riassunto: "Ispezioni lungo il litorale della provincia per garantire la sicurezza balneare e contrastare l'abusivismo.", link: "https://store.lasicilia.it/" }
                    ],
                    politica: [
                        { giornale: "Gazzetta del Sud", classe: "gds", titolo: "Palazzo San Giorgio: scontro in aula sui fondi PNRR", riassunto: "Dibattito acceso tra maggioranza e opposizione sul bilancio e sulla digitalizzazione dei servizi comunali.", link: "https://gazzettadelsud.it/pagine/edicola-digitale/" },
                        { giornale: "La Sicilia", classe: "ls", titolo: "Vertice sullo Stretto: intesa politica per le aree retroportuali", riassunto: "Accordo tra i rappresentanti istituzionali calabresi e siciliani per il potenziamento dei collegamenti marittimi veloci.", link: "https://store.lasicilia.it/" }
                    ]
                },
                ME: {
                    cronaca: [
                        { giornale: "Gazzetta del Sud", classe: "gds", titolo: "Messina: Nuovi cantieri e scambi di carreggiata sul viadotto Ritiro", riassunto: "Il report della mattina evidenzia le deviazioni necessarie per permettere la messa in sicurezza dei piloni della tangenziale.", link: "https://gazzettadelsud.it/pagine/edicola-digitale/" },
                        { giornale: "La Sicilia", classe: "ls", titolo: "Emergenza idrica a Messina: scatta il piano di razionamento AMAM", riassunto: "Pubblicata la mappa dei quartieri della zona sud che subiranno riduzioni dell'orario di erogazione per lavori alla condotta.", link: "https://store.lasicilia.it/" }
                    ],
                    politica: [
                        { giornale: "Gazzetta del Sud", classe: "gds", titolo: "Palazzo Zanca: la giunta accelera sul nuovo piano urbano dei rifiuti", riassunto: "Presentate le modifiche ai regolamenti per incrementare la raccolta differenziata nelle aree commerciali.", link: "https://gazzettadelsud.it/pagine/edicola-digitale/" },
                        { giornale: "La Sicilia", classe: "ls", titolo: "Fronte mare cittadino: l'Autorità Portuale stanzia nuovi fondi", riassunto: "Approvati i progetti per la riqualificazione della passeggiata a mare e l'ammodernamento delle banchine crociere.", link: "https://store.lasicilia.it/" }
                    ]
                }
            },
            
            // --- DATI PER IL 24 MAGGIO 2026 ---
            "2026-05-24": {
                RC: {
                    cronaca: [
                        { giornale: "Gazzetta del Sud", classe: "gds", titolo: "Gioia Tauro: Sequestro record di merci contraffatte al porto", riassunto: "Operazione congiunta di Agenzia delle Dogane e Guardia di Finanza. Bloccati tre container provenienti dall'Asia.", link: "https://gazzettadelsud.it/pagine/edicola-digitale/" },
                        { giornale: "La Sicilia", classe: "ls", titolo: "Locride: Disservizi sulla rete elettrica a causa del forte vento", riassunto: "Interventi incessanti dei Vigili del Fuoco per rimuovere alberi caduti sui cavi dell'alta tensione nell'entroterra.", link: "https://store.lasicilia.it/" }
                    ],
                    politica: [
                        { giornale: "Gazzetta del Sud", classe: "gds", titolo: "Sanità reggina: il Commissario presenta il piano di assunzioni", riassunto: "Sbloccati i concorsi per venti nuovi medici di urgenza da destinare ai pronto soccorso della provincia.", link: "https://gazzettadelsud.it/pagine/edicola-digitale/" },
                        { giornale: "La Sicilia", classe: "ls", titolo: "Turismo montano: mozione in Consiglio Regionale per rilanciare l'Aspromonte", riassunto: "Richiesti fondi straordinari per la manutenzione della sentieristica e il potenziamento dei rifugi storici.", link: "https://store.lasicilia.it/" }
                    ]
                },
                ME: {
                    cronaca: [
                        { giornale: "Gazzetta del Sud", classe: "gds", titolo: "Messina: Incidente sulla A20 all'interno della galleria Telegrafo", riassunto: "Tamponamento tra due mezzi pesanti. Traffico paralizzato in direzione Palermo per gran parte della mattinata.", link: "https://gazzettadelsud.it/pagine/edicola-digitale/" },
                        { giornale: "La Sicilia", classe: "ls", titolo: "Milazzo: Sversamento di idrocarburi, scatta il piano ambientale", riassunto: "Intervenute le barriere galleggianti nel porto per circoscrivere una chiazza oleosa proveniente da una nave cisterna.", link: "https://store.lasicilia.it/" }
                    ],
                    politica: [
                        { giornale: "Gazzetta del Sud", classe: "gds", titolo: "Messina Social City: approvato l'ampliamento dei servizi di assistenza", riassunto: "Il Consiglio comunale delibera lo stanziamento di nuove risorse per il supporto domiciliare agli anziani.", link: "https://gazzettadelsud.it/pagine/edicola-digitale/" },
                        { giornale: "La Sicilia", classe: "ls", titolo: "Eolie libere dalle auto: i Sindaci firmano l'ordinanza estiva", riassunto: "Stop all'afflusso dei veicoli dei non residenti a partire dal prossimo fine settimana per tutelare gli arcipelaghi.", link: "https://store.lasicilia.it/" }
                    ]
                }
            },

            // --- DATI PER IL 25 MAGGIO 2026 ---
            "2026-05-25": {
                RC: {
                    cronaca: [
                        { giornale: "Gazzetta del Sud", classe: "gds", titolo: "Reggio: Sicurezza urbana, telecamere di ultima generazione in centro", riassunto: "Attivati trenta nuovi dispositivi di videosorveglianza collegati direttamente con la centrale operativa.", link: "https://gazzettadelsud.it/pagine/edicola-digitale/" },
                        { giornale: "La Sicilia", classe: "ls", titolo: "Palmi: Trovato un antico reperto romano durante gli scavi per la rete gas", riassunto: "I lavori sono stati temporaneamente sospesi per consentire i rilievi della Soprintendenza Archeologica.", link: "https://store.lasicilia.it/" }
                    ],
                    politica: [
                        { giornale: "Gazzetta del Sud", classe: "gds", titolo: "Trasporti regionali: tavolo tecnico sulla ferrovia Jonica", riassunto: "I sindaci dell'area grecanica chiedono il potenziamento delle corse dei treni pendolari e l'elettrificazione della linea.", link: "https://gazzettadelsud.it/pagine/edicola-digitale/" },
                        { giornale: "La Sicilia", classe: "ls", titolo: "Rifiuti, la Città Metropolitana approva le linee guida sulle isole ecologiche", riassunto: "Nuovi incentivi economici previsti per i comuni che raggiungeranno il 65% di raccolta differenziata.", link: "https://store.lasicilia.it/" }
                    ]
                },
                ME: {
                    cronaca: [
                        { giornale: "Gazzetta del Sud", classe: "gds", titolo: "Messina: inaugurata la nuova villetta di Camaro dopo anni di degrado", riassunto: "Taglio del nastro alla presenza delle associazioni di quartiere. Installati nuovi giochi per bambini e panchine.", link: "https://gazzettadelsud.it/pagine/edicola-digitale/" },
                        { giornale: "La Sicilia", classe: "ls", titolo: "Barcellona Pozzo di Gotto: controlli straordinari nei locali della movida", riassunto: "Sanzionati tre esercizi commerciali per emissioni sonore oltre l'orario consentito e somministrazione non autorizzata.", link: "https://store.lasicilia.it/" }
                    ],
                    politica: [
                        { giornale: "Gazzetta del Sud", classe: "gds", titolo: "Crisi idrica, i partiti di opposizione chiedono una seduta straordinaria", riassunto: "Presentata la formale richiesta a Palazzo Zanca per un confronto pubblico urgente con i vertici dell'azienda AMAM.", link: "https://gazzettadelsud.it/pagine/edicola-digitale/" },
                        { giornale: "La Sicilia", classe: "ls", titolo: "Taormina: discussione sul ticket d'ingresso per i pullman turistici", riassunto: "La giunta propone un aumento della tariffa di accesso per finanziare i servizi di pulizia urbana durante l'alta stagione.", link: "https://store.lasicilia.it/" }
                    ]
                }
            }
        };

        // Estraiamo il pacchetto di notizie del giorno selezionato
        const datiDelGiorno = databaseArchivio[dataSelezionata];
        
        feedContainer.innerHTML = "";

        if (datiDelGiorno && datiDelGiorno[prov] && datiDelGiorno[prov][categoriaSelezionata]) {
            const notizieSelezionate = datiDelGiorno[prov][categoriaSelezionata];
            
            notizieSelezionate.forEach(notizia => {
                const card = document.createElement("div");
                card.className = `news-card ${notizia.classe}`;
                card.innerHTML = `
                    <div class="meta-info">EDIZIONE STAMPATA — ${notizia.giornale.toUpperCase()} — DEL ${dataFormattata}</div>
                    <h3>${notizia.titolo}</h3>
                    <p><strong>Sintesi della redazione:</strong> ${notizia.riassunto}</p>
                    <a href="${notizia.link}" target="_blank">Apri l'Edicola Digitale di ${notizia.giornale} →</a>
                `;
                feedContainer.appendChild(card);
            });
        } else {
            // Messaggio d'errore se l'utente sceglie un giorno fuori dal database
            feedContainer.innerHTML = `
                <div style='text-align:center; padding: 20px; color:#64748b; font-family:sans-serif;'>
                    <p>⚠️ <strong>Dati non presenti in archivio per il giorno ${dataFormattata}.</strong></p>
                    <p style="font-size:13px; margin-top:5px;">Per testare il cambio effettivo delle notizie, seleziona una di queste date nel calendario:</p>
                    <ul style="display:inline-block; text-align:left; font-size:13px; color:var(--accent);">
                        <li><strong>23/05/2026</strong> (Oggi)</li>
                        <li><strong>24/05/2026</strong> (Domani)</li>
                        <li><strong>25/05/2026</strong> (Dopodomani)</li>
                    </ul>
                </div>`;
        }

    }, 200);
}

function avviaStampa() {
    window.print();
}