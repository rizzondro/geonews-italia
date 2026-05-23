let categoriaSelezionata = "cronaca"; // Parte con cronaca di default

window.onload = function() {
    // Imposta il calendario su oggi all'avvio
    const oggi = new Date();
    const anno = oggi.getFullYear();
    const mese = String(oggi.getMonth() + 1).padStart(2, '0');
    const giorno = String(oggi.getDate()).padStart(2, '0');
    
    document.getElementById('data-ricerca').value = `${anno}-${mese}-${giorno}`;
    
    // Mostra subito le notizie
    aggiornaRassegna();
};

function cambiaCategoria(cat) {
    categoriaSelezionata = cat;
    // Rimuove il colore blu da tutti i bottoni e lo mette solo a quello cliccato
    document.querySelectorAll(".categories .btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById(`cat-${cat}`).classList.add("active");
    
    aggiornaRassegna();
}

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

    const dataFormattata = dataSelezionata.split('-').reverse().join('/');

    // Prepara i dati per l'intestazione della stampa fisica
    document.getElementById("print-meta-date").textContent = `Provincia: ${prov === "RC" ? "Reggio Calabria" : "Messina"} | Giornale: ${giornaleNome} | Categoria: ${categoriaSelezionata.toUpperCase()} | Data: ${dataFormattata}`;

    feedContainer.innerHTML = "<p style='text-align:center;'>Consultazione archivio cartaceo in corso...</p>";

    setTimeout(() => {
        // Database simulato organizzato per Provincia -> Giornale -> Categoria
        const archivioCompleto = {
            RC: {
                GDS: {
                    cronaca: [
                        {
                            titolo: "Reggio, piano straordinario di rifacimento asfalto sulle arterie interne",
                            riassunto: "L'edizione cartacea odierna riporta il piano straordinario approvato dal Comune. I cantieri partiranno immediatamente dalle aree periferiche per poi convergere sul centro storico.",
                            link: "https://gazzettadelsud.it/regionali/calabria/"
                        }
                    ],
                    politica: [
                        {
                            titolo: "Consiglio Comunale a Palazzo San Giorgio: approvato il bilancio di previsione",
                            riassunto: "Lunga discussione d'aula incentrata sull'allocazione dei fondi del PNRR destinati allo sviluppo dei servizi costieri e alla digitalizzazione degli uffici.",
                            link: "https://gazzettadelsud.it/regionali/calabria/"
                        }
                    ],
                    sport: [
                        {
                            titolo: "La Reggina prepara la sfida al Granillo: atteso il pubblico delle grandi occasioni",
                            riassunto: "Dalle colonne del quotidiano, lo staff tecnico sprona la squadra. Prevendita biglietti molto attiva nelle ricevitorie della provincia.",
                            link: "https://gazzettadelsud.it/sport/"
                        }
                    ],
                    attualita: [
                        {
                            titolo: "Record di ingressi al Museo Nazionale di Reggio per i Bronzi di Riace",
                            riassunto: "I dati dell'ufficio turistico confermano un trend in forte crescita di visitatori stranieri attirati dalle collezioni archeologiche dello Stretto.",
                            link: "https://gazzettadelsud.it/regionali/calabria/"
                        }
                    ]
                },
                LS: {
                    cronaca: [
                        {
                            titolo: "Controlli della Guardia Costiera sulle spiagge della provincia reggina",
                            riassunto: "Focus del corrispondente locale sulle attività di monitoraggio dei litorali per garantire la sicurezza balneare e il rispetto delle concessioni.",
                            link: "https://www.lasicilia.it/"
                        }
                    ],
                    politica: [
                        {
                            titolo: "Infrastrutture dello Stretto: tavoli tecnici tra le sponde calabre e siciliane",
                            riassunto: "Rappresentanti istituzionali si interrogano sulle tempistiche dei collegamenti marittimi veloci e sullo sviluppo delle aree retroportuali.",
                            link: "https://www.lasicilia.it/"
                        }
                    ],
                    sport: [
                        {
                            titolo: "Campionati dilettantistici: il punto sulla giornata calcistica",
                            riassunto: "Classifiche, risultati e commenti approfonditi sui match che hanno coinvolto le principali formazioni della provincia di Reggio.",
                            link: "https://www.lasicilia.it/"
                        }
                    ],
                    attualita: [
                        {
                            titolo: "Presentato il festival letterario estivo che unisce Scilla e Cariddi",
                            riassunto: "Incontri con gli autori ed eventi culturali si snoderanno in varie location storiche delle due province costiere nei prossimi mesi.",
                            link: "https://www.lasicilia.it/"
                        }
                    ]
                }
            },
            ME: {
                GDS: {
                    cronaca: [
                        {
                            titolo: "Messina, cantieri aperti sul viadotto Ritiro: varate nuove modifiche viarie",
                            riassunto: "Il consueto report della mattina evidenzia le deviazioni necessarie per permettere la messa in sicurezza dei piloni. Attese code nelle ore di punta.",
                            link: "https://gazzettadelsud.it/regionali/sicilia/"
                        }
                    ],
                    politica: [
                        {
                            titolo: "Palazzo Zanca accelera sul nuovo piano rifiuti urbano",
                            riassunto: "La giunta comunale presenta le modifiche ai regolamenti per incrementare la raccolta differenziata nelle aree commerciali e residenziali.",
                            link: "https://gazzettadelsud.it/regionali/sicilia/"
                        }
                    ],
                    sport: [
                        {
                            titolo: "Acr Messina, seduta di allenamento intensa in vista del prossimo match casalingo",
                            riassunto: "Il tecnico valuta cambi di modulo a centrocampo per superare la crisi di risultati. Squadra in ritiro per ritrovare la massima concentrazione.",
                            link: "https://gazzettadelsud.it/sport/"
                        }
                    ],
                    attualita: [
                        {
                            titolo: "Il Teatro Vittorio Emanuele svela la nuova stagione di prosa",
                            riassunto: "Grandi nomi del teatro italiano e produzioni locali nel ricco cartellone presentato ieri alla stampa dal comitato organizzativo.",
                            link: "https://gazzettadelsud.it/regionali/sicilia/"
                        }
                    ]
                },
                LS: {
                    cronaca: [
                        {
                            titolo: "Emergenza idrica a Messina: l'AMAM programma i turni di erogazione",
                            riassunto: "Dettagliato piano di razionamento pubblicato sulle pagine del quotidiano per fronteggiare i lavori di manutenzione straordinaria della condotta del Fiumefreddo.",
                            link: "https://www.lasicilia.it/"
                        }
                    ],
                    politica: [
                        {
                            titolo: "Rilancio del fronte mare cittadino: l'Autorità Portuale stanzia nuovi fondi",
                            riassunto: "Progetti approvati per la riqualificazione della passeggiata a mare e la modernizzazione delle banchine destinate alle navi da crociera.",
                            link: "https://www.lasicilia.it/"
                        }
                    ],
                    sport: [
                        {
                            titolo: "Basket messinese: le sfide del fine settimana nei campionati nazionali",
                            riassunto: "Le analisi pre-partita dei principali club della provincia impegnati nei parquet di tutta Italia. Le interviste ai capitani.",
                            link: "https://www.lasicilia.it/"
                        }
                    ],
                    attualita: [
                        {
                            titolo: "Taormina Arte scalda i motori: confermati i primi ospiti internazionali",
                            riassunto: "Il resoconto sulle prime indiscrezioni relative al festival cinematografico e musicale che prenderà il via tra poche settimane nello storico Teatro Antico.",
                            link: "https://www.lasicilia.it/"
                        }
                    ]
                }
            }
        };

        // Estrapoliamo i dati corretti navigando nel database
        const notizieSelezionate = archivioCompleto[prov][giornaleCodice][categoriaSelezionata] || [];

        feedContainer.innerHTML = "";
        
        if (notizieSelezionate.length > 0) {
            notizieSelezionate.forEach(notizia => {
                const card = document.createElement("div");
                card.className = "news-card";
                card.innerHTML = `
                    <div class="meta-info">EDIZIONE CARTACEA — ${giornaleNome} del ${dataFormattata}</div>
                    <h3>${notizia.titolo}</h3>
                    <p><strong>Riassunto della pagina stampata:</strong> ${notizia.riassunto}</p>
                    <a href="${notizia.link}" target="_blank">Consulta la pagina originale del giornale →</a>
                `;
                feedContainer.appendChild(card);
            });
        } else {
            feedContainer.innerHTML = `<p style='text-align:center; color:#666;'>Nessuna notizia in archivio per questa categoria in data ${dataFormattata}.</p>`;
        }

    }, 300);
}

function avviaStampa() {
    window.print();
}