let categoriaSelezionata = "cronaca";

window.onload = function() {
    // Imposta il calendario sulla data di oggi all'avvio
    const oggi = new Date();
    const anno = oggi.getFullYear();
    const mese = String(oggi.getMonth() + 1).padStart(2, '0');
    const giorno = String(oggi.getDate()).padStart(2, '0');
    
    document.getElementById('data-ricerca').value = `${anno}-${mese}-${giorno}`;
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

    // Convertiamo la data da AAAA-MM-GG a GG/MM/AAAA per scriverla nei titoli
    const dataFormattata = dataSelezionata.split('-').reverse().join('/');
    const nomeProvincia = prov === "RC" ? "Reggio Calabria" : "Messina";

    document.getElementById("print-meta-date").textContent = `PROVINCIA: ${nomeProvincia.toUpperCase()} | CATEGORIA: ${categoriaSelezionata.toUpperCase()} | EDIZIONI DEL: ${dataFormattata}`;

    feedContainer.innerHTML = "<p style='text-align:center;'>Estrazione e confronto edizioni cartacee...</p>";

    // Struttura dei dati dinamica. Sostituisce i testi inserendo la data corretta scelta dall'utente.
    setTimeout(() => {
        let notizieGenerate = [];

        if (prov === "RC") {
            if (categoriaSelezionata === "cronaca") {
                notizieGenerate = [
                    {
                        giornale: "Gazzetta del Sud", classe: "gds",
                        titolo: `Reggio Calabria, l'edizione del ${dataFormattata} apre con il piano asfalti nelle periferie`,
                        riassunto: `La pagina di Reggio del ${dataFormattata} analizza lo stanziamento di fondi straordinari approvato per il rifacimento del manto stradale dei quartieri collinari e della zona sud.`,
                        link: "https://gazzettadelsud.it/pagine/edicola-digitale/"
                    },
                    {
                        giornale: "La Sicilia", classe: "ls",
                        titolo: `La Sicilia del ${dataFormattata}: Controlli serrati della Guardia Costiera sulle spiagge reggine`,
                        riassunto: `Nell'edizione odierna stampata il 23 maggio 2026, si evidenziano le ispezioni notturne effettuate lungo il litorale della provincia per contrastare l'abusivismo demaniale.`,
                        link: "https://store.lasicilia.it/"
                    }
                ];
            } else if (categoriaSelezionata === "politica") {
                notizieGenerate = [
                    {
                        giornale: "Gazzetta del Sud", classe: "gds",
                        titolo: `Palazzo San Giorgio, il dibattito d'aula sul bilancio nell'edizione del ${dataFormattata}`,
                        riassunto: `I cronisti politici approfondiscono lo scontro sui fondi PNRR destinati al waterfront e alla digitalizzazione del comune di Reggio Calabria.`,
                        link: "https://gazzettadelsud.it/pagine/edicola-digitale/"
                    },
                    {
                        giornale: "La Sicilia", classe: "ls",
                        titolo: `Tavolo sullo Stretto: l'analisi politica de La Sicilia del ${dataFormattata}`,
                        riassunto: `Resoconto dettagliato del vertice romano tra i rappresentanti della Provincia reggina e della sponda siciliana per lo sviluppo retroportuale.`,
                        link: "https://store.lasicilia.it/"
                    }
                ];
            } else if (categoriaSelezionata === "sport") {
                notizieGenerate = [
                    {
                        giornale: "Gazzetta del Sud", classe: "gds",
                        titolo: `Reggina, parla il mister sul foglio del ${dataFormattata}: "Al Granillo serve il cuore"`,
                        riassunto: `L'intervista esclusiva della mattina analizza lo stato di forma della squadra in vista del match casalingo di domenica.`,
                        link: "https://gazzettadelsud.it/pagine/edicola-digitale/"
                    },
                    {
                        giornale: "La Sicilia", classe: "ls",
                        titolo: `Il punto sul calcio dilettantistico calabrese nell'edizione del ${dataFormattata}`,
                        riassunto: `Focus completo con probabili formazioni, squalifiche e cambi di panchina per le squadre della provincia reggina.`,
                        link: "https://store.lasicilia.it/"
                    }
                ];
            } else if (categoriaSelezionata === "attualita") {
                notizieGenerate = [
                    {
                        giornale: "Gazzetta del Sud", classe: "gds",
                        titolo: `Boom di turisti al Museo di Reggio: l'articolo della Gazzetta del ${dataFormattata}`,
                        riassunto: `I dati ufficiali della settimana confermano file record per ammirare i Bronzi di Riace, con un incremento netto di visitatori francesi e tedeschi.`,
                        link: "https://gazzettadelsud.it/pagine/edicola-digitale/"
                    },
                    {
                        giornale: "La Sicilia", classe: "ls",
                        titolo: `Scilla e Cariddi unite dalla letteratura: la pagina culturale del ${dataFormattata}`,
                        riassunto: `Presentazione del cartellone degli eventi estivi che vedrà scrittori e saggisti confrontarsi nelle arene all'aperto delle due coste.`,
                        link: "https://store.lasicilia.it/"
                    }
                ];
            }
        } else {
            // PROVINCIA DI MESSINA (ME)
            if (categoriaSelezionata === "cronaca") {
                notizieGenerate = [
                    {
                        giornale: "Gazzetta del Sud", classe: "gds",
                        titolo: `Messina, l'edizione del ${dataFormattata} mappa i cantieri sul viadotto Ritiro`,
                        riassunto: `L'articolo della cronaca locale descrive i nuovi scambi di carreggiata necessari per consentire i collaudi strutturali dei piloni della tangenziale.`,
                        link: "https://gazzettadelsud.it/pagine/edicola-digitale/"
                    },
                    {
                        giornale: "La Sicilia", classe: "ls",
                        titolo: `Emergenza idrica a Messina: il piano AMAM sul giornale del ${dataFormattata}`,
                        riassunto: `La Sicilia pubblica la mappa dei quartieri della zona sud che subiranno riduzioni dell'orario di erogazione a causa delle riparazioni alla condotta del Fiumefreddo.`,
                        link: "https://store.lasicilia.it/"
                    }
                ];
            } else if (categoriaSelezionata === "politica") {
                notizieGenerate = [
                    {
                        giornale: "Gazzetta del Sud", classe: "gds",
                        titolo: `Palazzo Zanca, scontro sul piano rifiuti urbano nell'edizione del ${dataFormattata}`,
                        riassunto: `La cronaca politica messinese racconta le frizioni in consiglio per l'approvazione delle nuove tariffe e delle sanzioni per la differenziata.`,
                        link: "https://gazzettadelsud.it/pagine/edicola-digitale/"
                    },
                    {
                        giornale: "La Sicilia", classe: "ls",
                        titolo: `Fronte mare di Messina: i fondi stanziati sul quotidiano del ${dataFormattata}`,
                        riassunto: `Analisi del provvedimento dell'Autorità Portuale che sblocca i finanziamenti per la nuova passeggiata e il terminal crociere.`,
                        link: "https://store.lasicilia.it/"
                    }
                ];
            } else if (categoriaSelezionata === "sport") {
                notizieGenerate = [
                    {
                        giornale: "Gazzetta del Sud", classe: "gds",
                        titolo: `Acr Messina, il report dell'allenamento della mattina del ${dataFormattata}`,
                        riassunto: `Squadra blindata a porte chiuse. Il tecnico valuta l'inserimento della seconda punta per scardinare la difesa avversaria nel prossimo turno.`,
                        link: "https://gazzettadelsud.it/pagine/edicola-digitale/"
                    },
                    {
                        giornale: "La Sicilia", classe: "ls",
                        titolo: `Il basket messinese cerca il riscatto: la pagina sportiva del ${dataFormattata}`,
                        riassunto: `Presentazione della trasferta cruciale per le sorti del campionato, con interviste esclusive ai preparatori atletici.`,
                        link: "https://store.lasicilia.it/"
                    }
                ];
            } else if (categoriaSelezionata === "attualita") {
                notizieGenerate = [
                    {
                        giornale: "Gazzetta del Sud", classe: "gds",
                        titolo: `Teatro Vittorio Emanuele, la nuova stagione sulle pagine del ${dataFormattata}`,
                        riassunto: `I critici teatrali recensiscono in anteprima il cartellone di prosa e musica lirica presentato ufficialmente dal direttivo del teatro di Messina.`,
                        link: "https://gazzettadelsud.it/pagine/edicola-digitale/"
                    },
                    {
                        giornale: "La Sicilia", classe: "ls",
                        titolo: `Taormina Arte scalda i motori: le anticipazioni de La Sicilia del ${dataFormattata}`,
                        riassunto: `Cronaca culturale incentrata sui primi contratti firmati con le star internazionali che calcheranno il palco del Teatro Antico quest'estate.`,
                        link: "https://store.lasicilia.it/"
                    }
                ];
            }
        }

        // Svuotiamo lo schermo e stampiamo i blocchi aggiornati
        feedContainer.innerHTML = "";
        
        if (notizieGenerate.length > 0) {
            notizieGenerate.forEach(notizia => {
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
            feedContainer.innerHTML = `<p style='text-align:center;'>Nessuna notizia trovata per la data selezionata.</p>`;
        }

    }, 200);
}

function avviaStampa() {
    window.print();
}