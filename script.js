window.onload = function() {
    caricaNotizieVere();
};

function caricaNotizieVere() {
    const area = document.getElementById("provincia").value;
    
    const containerGds = document.getElementById("feed-gds");
    const containerLs = document.getElementById("feed-ls");
    
    containerGds.innerHTML = '<div class="loading">⏳ Lettura diretta della redazione Gazzetta del Sud...</div>';
    containerLs.innerHTML = '<div class="loading">⏳ Lettura diretta della redazione La Sicilia...</div>';

    // 1. LINK DEI FEED RSS UFFICIALI E REALI
    let urlRssGds = "https://gazzettadelsud.it/rss/messina-4cc934a3-6eb4-47da-9bf9-9c5952d7e486/"; 
    let urlRssLs = "https://www.lasicilia.it/rss/messina/"; 

    if (area === "RC") {
        urlRssGds = "https://gazzettadelsud.it/rss/reggio-95df21a0-ba11-4770-bcbf-9195feee637d/"; 
        urlRssLs = "https://www.lasicilia.it/rss/calabria/"; 
    }

    // Utilizziamo il proxy AllOrigins (sicuro e senza limiti di sovraccarico) per bypassare il blocco CORS del browser
    const proxyInvisibile = "https://api.allorigins.win/get?url=";

    // --- ELABORAZIONE GAZZETTA DEL SUD ---
    fetch(proxyInvisibile + encodeURIComponent(urlRssGds))
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Rete non rispondente');
        })
        .then(data => {
            // AllOrigins restituisce il file XML originale dentro una stringa chiamata data.contents
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "text/xml");
            const items = xmlDoc.getElementsByTagName("item");

            containerGds.innerHTML = "";

            if (items.length > 0) {
                // Prende i 5 articoli più recenti in assoluto
                for (let i = 0; i < Math.min(items.length, 5); i++) {
                    const titolo = items[i].getElementsByTagName("title")[0]?.textContent || "Titolo non disponibile";
                    const link = items[i].getElementsByTagName("link")[0]?.textContent || "#";
                    let desc = items[i].getElementsByTagName("description")[0]?.textContent || "";
                    
                    // Pulizia tag HTML interni al testo
                    desc = desc.replace(/<[^>]*>/g, '');
                    if (desc.length > 140) desc = desc.substring(0, 140) + "...";
                    if (!desc) desc = "Clicca per leggere i dettagli della notizia direttamente sul portale.";

                    const card = document.createElement("div");
                    card.className = "news-card gds";
                    card.innerHTML = `
                        <h3>${titolo}</h3>
                        <p>${desc}</p>
                        <a href="${link}" target="_blank">Leggi la notizia vera su Gazzetta del Sud →</a>
                    `;
                    containerGds.appendChild(card);
                }
            } else {
                containerGds.innerHTML = "<div class='loading'>⚠️ Il server della Gazzetta non ha trasmesso notizie in questo momento. Riprova tra pochi minuti.</div>";
            }
        })
        .catch(error => {
            console.error(error);
            containerGds.innerHTML = "<div class='loading'>❌ Errore tecnico di ricezione dati dalla redazione Gazzetta.</div>";
        });


    // --- ELABORAZIONE LA SICILIA ---
    fetch(proxyInvisibile + encodeURIComponent(urlRssLs))
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Rete non rispondente');
        })
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "text/xml");
            const items = xmlDoc.getElementsByTagName("item");

            containerLs.innerHTML = "";

            if (items.length > 0) {
                // Prende i 5 articoli più recenti in assoluto
                for (let i = 0; i < Math.min(items.length, 5); i++) {
                    const titolo = items[i].getElementsByTagName("title")[0]?.textContent || "Titolo non disponibile";
                    const link = items[i].getElementsByTagName("link")[0]?.textContent || "#";
                    let desc = items[i].getElementsByTagName("description")[0]?.textContent || "";
                    
                    desc = desc.replace(/<[^>]*>/g, '');
                    if (desc.length > 140) desc = desc.substring(0, 140) + "...";
                    if (!desc) desc = "Clicca per leggere i dettagli della notizia direttamente sul portale.";

                    const card = document.createElement("div");
                    card.className = "news-card ls";
                    card.innerHTML = `
                        <h3>${titolo}</h3>
                        <p>${desc}</p>
                        <a href="${link}" target="_blank">Leggi la notizia vera su La Sicilia →</a>
                    `;
                    containerLs.appendChild(card);
                }
            } else {
                containerLs.innerHTML = "<div class='loading'>⚠️ Il server de La Sicilia non ha trasmesso notizie in questo momento. Riprova tra pochi minuti.</div>";
            }
        })
        .catch(error => {
            console.error(error);
            containerLs.innerHTML = "<div class='loading'>❌ Errore tecnico di ricezione dati dalla redazione La Sicilia.</div>";
        });
}