window.onload = function() {
    caricaNotizieVere();
};

function caricaNotizieVere() {
    const area = document.getElementById("provincia").value;
    
    const containerGds = document.getElementById("feed-gds");
    const containerLs = document.getElementById("feed-ls");
    
    containerGds.innerHTML = '<div class="loading">Scaricano gli ultimi titoli veri della Gazzetta...</div>';
    containerLs.innerHTML = '<div class="loading">Scaricano gli ultimi titoli veri de La Sicilia...</div>';

    // 1. IMPOSTAZIONE URL DEI FEED REALI DEI GIORNALI
    let urlRssGds = "https://gazzettadelsud.it/rss/messina-4cc934a3-6eb4-47da-9bf9-9c5952d7e486/"; // Messina di base
    let urlRssLs = "https://www.lasicilia.it/rss/messina/"; // Messina di base

    if (area === "RC") {
        urlRssGds = "https://gazzettadelsud.it/rss/reggio-95df21a0-ba11-4770-bcbf-9195feee637d/"; // Reggio Calabria
        urlRssLs = "https://www.lasicilia.it/rss/calabria/"; // La Sicilia usa il canale Calabria per Reggio
    }

    // Utilizziamo un convertitore pubblico e gratuito (rss2json) per superare i blocchi di sicurezza (CORS) del telefono
    const proxyRss = "https://api.rss2json.com/v1/api.json?rss_url=";

    // --- CARICAMENTO GAZZETTA DEL SUD ---
    fetch(proxyRss + encodeURIComponent(urlRssGds))
        .then(response => response.json())
        .then(data => {
            containerGds.innerHTML = "";
            if (data.status === "ok" && data.items.length > 0) {
                // Prendiamo le prime 4 notizie più recenti di oggi
                data.items.slice(0, 4).forEach(item => {
                    const card = document.createElement("div");
                    card.className = "news-card gds";
                    
                    // Pulizia del testo della descrizione se troppo lungo
                    let descrizione = item.description ? item.description.replace(/<[^>]*>/g, '') : "Clicca sul link per leggere l'articolo completo.";
                    if (descrizione.length > 140) descrizione = descrizione.substring(0, 140) + "...";

                    card.innerHTML = `
                        <h3>${item.title}</h3>
                        <p>${descrizione}</p>
                        <div class="meta">⏱️ Pubblicato il: ${formattaDataRss(item.pubDate)}</div>
                        <a href="${item.link}" target="_blank">Leggi l'articolo originale →</a>
                    `;
                    containerGds.appendChild(card);
                });
            } else {
                containerGds.innerHTML = "<div class='loading'>Nessuna notizia recente trovata nel feed o redazione temporaneamente non raggiungibile.</div>";
            }
        })
        .catch(() => {
            containerGds.innerHTML = "<div class='loading'>❌ Errore di connessione al server della Gazzetta.</div>";
        });

    // --- CARICAMENTO LA SICILIA ---
    fetch(proxyRss + encodeURIComponent(urlRssLs))
        .then(response => response.json())
        .then(data => {
            containerLs.innerHTML = "";
            if (data.status === "ok" && data.items.length > 0) {
                // Prendiamo le prime 4 notizie più recenti di oggi
                data.items.slice(0, 4).forEach(item => {
                    const card = document.createElement("div");
                    card.className = "news-card ls";
                    
                    let descrizione = item.description ? item.description.replace(/<[^>]*>/g, '') : "Clicca sul link per leggere l'articolo completo.";
                    if (descrizione.length > 140) descrizione = descrizione.substring(0, 140) + "...";

                    card.innerHTML = `
                        <h3>${item.title}</h3>
                        <p>${descrizione}</p>
                        <div class="meta">⏱️ Pubblicato il: ${formattaDataRss(item.pubDate)}</div>
                        <a href="${item.link}" target="_blank">Leggi l'articolo originale →</a>
                    `;
                    containerLs.appendChild(card);
                });
            } else {
                containerLs.innerHTML = "<div class='loading'>Nessuna notizia recente trovata nel feed o redazione temporaneamente non raggiungibile.</div>";
            }
        })
        .catch(() => {
            containerLs.innerHTML = "<div class='loading'>❌ Errore di connessione al server de La Sicilia.</div>";
        });
}

// Funzione interna per rendere leggibile l'orario di pubblicazione sul telefono
function formattaDataRss(dataString) {
    try {
        const d = new Date(dataString);
        const giorno = String(d.getDate()).padStart(2, '0');
        const mese = String(d.getMonth() + 1).padStart(2, '0');
        const ore = String(d.getHours()).padStart(2, '0');
        const minuti = String(d.getMinutes()).padStart(2, '0');
        return `${giorno}/${mese} alle ore ${ore}:${minuti}`;
    } catch(e) {
        return dataString;
    }
}