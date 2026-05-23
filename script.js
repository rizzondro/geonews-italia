function cambiaRedazione() {
    const area = document.getElementById("provincia").value;
    const iframeGds = document.getElementById("iframe-gds");
    const iframeLs = document.getElementById("iframe-ls");

    if (area === "ME") {
        // Indirizzi ufficiali per Messina
        iframeGds.src = "https://messina.gazzettadelsud.it/";
        iframeLs.src = "https://www.lasicilia.it/messina/";
    } else if (area === "RC") {
        // Indirizzi ufficiali per Reggio Calabria
        iframeGds.src = "https://reggio.gazzettadelsud.it/";
        iframeLs.src = "https://www.lasicilia.it/tag/reggio-calabria/"; 
    }
}