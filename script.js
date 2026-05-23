let categoriaSelezionata = "";

// Si attiva quando l'utente cambia la provincia nel menu a tendina
function gestisciSelezioneProvincia() {
    const provValue = document.getElementById("provincia").value;
    const bottoni = document.querySelectorAll(".categories .btn");
    
    // Sblocca i bottoni delle categorie solo se è selezionata una provincia
    bottoni.forEach(btn => btn.disabled = !provValue);
    
    if (provValue) {
        if (categoriaSelezionata) {
            // Se c'era già una categoria cliccata, aggiorna subito le notizie
            scaricaNotizie();
        } else {
            document.getElementById("news-feed").innerHTML = "<p style='text-align: center; color: #666;'>Ottimo! Ora seleziona una categoria qui sopra.</p>";
        }
    } else {
        disattivaTutto();
    }
}

function disattivaTutto() {
    categoriaSelezionata = "";
    document.querySelectorAll(".categories .btn").forEach(btn => {
        btn.disabled = true;
        btn.classList.remove("active");
    });
    document.getElementById("news-feed").innerHTML = "<p style='text-align: center; color: #666; font-size: 14px;'>Scegli una provincia per iniziare a leggere.</p>";
}

// Gestisce il click sui pulsanti Cronaca, Politica, ecc.
function cambiaCategoria(cat) {
    categoriaSelezionata = cat;
    document.querySelectorAll(".categories .btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById(`cat-${cat}`).classList.add("active");
    scaricaNotizie();
}

// Genera e mostra le notizie con le fonti locali e nazionali corrette
function scaricaNotizie() {
    const prov = document.getElementById("provincia").value;
    const feedContainer = document.getElementById("news-feed");
    
    feedContainer.innerHTML = "<p style='text-align:center; color:#1e555c;'>Aggiornamento feed in corso...</p>";

    // Simulazione database feed locale e nazionale integrato
    setTimeout(() => {
        const archivioNotizie = {
            RC: {
                cronaca: [
                    {
                        fonte: "ReggioToday",
                        titolo: "Controlli sul Lungomare Falcomatà: interventi della Polizia Locale",
                        descrizione: "Operazione di monitoraggio straordinario della movida e del commercio ambulante nel fine settimana sul chilometro più bello d'Italia.",
                        link: "https://www.reggiotoday.it/"
                    },
                    {
                        fonte: "Gazzetta del Sud",
                        titolo: "Lavori sulla Statale 106: previsti disagi nei pressi di Melito Porto Salvo",
                        descrizione: "Il cantiere per la messa in sicurezza della carreggiata comporterà un restringimento temporaneo. Attesi rallentamenti.",
                        link: "https://gazzettadelsud.it/calabria/"
                    }
                ],
                politica: [
                    {
                        fonte: "Gazzetta del Sud",
                        titolo: "Consiglio Comunale a Palazzo San Giorgio: approvato il bilancio",
                        descrizione: "Seduta accesa sul piano delle opere pubbliche. Maggioranza e opposizione si scontrano sui fondi per le periferie.",
                        link: "https://gazzettadelsud.it/calabria/"
                    }
                ],
                sport: [
                    {
                        fonte: "Reggina 1914 Official",
                        titolo: "La Reggina prepara il riscatto al Granillo: fischio d'inizio domenica",
                        descrizione: "Gli amaranto tornano davanti ai propri tifosi con l'obiettivo di conquistare i tre punti fondamentali per la classifica.",
                        link: "https://www.tuttoreggina.com/"
                    }
                ],
                attualita: [
                    {
                        fonte: "ANSA Calabria",
                        titolo: "I Bronzi di Riace attirano turisti da tutta Europa al Museo Nazionale",
                        descrizione: "Fila record di visitatori a Reggio Calabria durante il weekend per ammirare i capolavori dell'arte greca.",
                        link: "https://www.ansa.it/calabria/"
                    }
                ]
            },
            ME: {
                cronaca: [
                    {
                        fonte: "MessinaToday",
                        titolo: "Svincolo Giostra: code e rallentamenti per la manutenzione delle barriere",
                        descrizione: "Tecnici al lavoro sulla tangenziale di Messina. Il traffico leggero e pesante ha subito forti deviazioni verso il centro.",
                        link: "https://www.messinatoday.it/"
                    },
                    {
                        fonte: "Gazzetta del Sud",
                        titolo: "Traghetti sullo Stretto: flussi intensi a Villa San Giovanni e Messina",
                        descrizione: "Inizio del controesodo con tempi di attesa che superano l'ora per l'imbarco sulle navi Caronte & Tourist.",
                        link: "https://gazzettadelsud.it/sicilia/"
                    }
                ],
                politica: [
                    {
                        fonte: "MessinaToday",
                        titolo: "Palazzo Zanca: varato il nuovo piano per la raccolta differenziata",
                        descrizione: "L'amministrazione comunale presenta le novità sui calendari di raccolta porta a porta e le sanzioni per gli evasori.",
                        link: "https://www.messinatoday.it/"
                    }
                ],
                sport: [
                    {
                        fonte: "Gazzetta dello Sport",
                        titolo: "Il Messina Calcio convince in trasferta: vittoria preziosa",
                        descrizione: "I giallorossi portano a casa un risultato utile grazie a una splendida prestazione difensiva e un contropiede letale.",
                        link: "https://www.gazzetta.it/"
                    }
                ],
                attualita: [
                    {
                        fonte: "ANSA Sicilia",
                        titolo: "Al via il cartellone estivo del Teatro Vittorio Emanuele di Messina",
                        descrizione: "Presentata la stagione culturale con grandi nomi della musica italiana e della prosa internazionale.",
                        link: "https://www.ansa.it/sicilia/"
                    }
                ]
            }
        };

        // Recuperiamo l'elenco di notizie per la provincia e la categoria selezionate
        const notizieDisponibili = archivioNotizie[prov][categoriaSelezionata] || [];

        if (notizieDisponibili.length > 0) {
            // Puliamo il contenitore dalle scritte precedenti
            feedContainer.innerHTML = "";
            
            // Cicliamo tutte le notizie trovate nell'archivio e le stampiamo a schermo
            notizieDisponibili.forEach(notizia => {
                const card = document.createElement("div");
                card.className = "news-card";
                card.innerHTML = `
                    <span class="source-tag">Fonte: ${notizia.fonte}</span>
                    <h3>${notizia.titolo}</h3>
                    <p>${notizia.descrizione}</p>
                    <a href="${notizia.link}" target="_blank">Leggi l'articolo originale su ${notizia.fonte} →</a>
                `;
                feedContainer.appendChild(card);
            });
        } else {
            feedContainer.innerHTML = "<p style='text-align:center; color:#666;'>Al momento non ci sono notizie in questa categoria.</p>";
        }
    }, 400);
}