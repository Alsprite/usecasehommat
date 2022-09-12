function kirjaudu() {
    let ID = document.getElementById("ID").value;
    console.log(ID);
    let ss = document.getElementById("salasana").value;
    console.log(ss);

    if (ID == "admin" && ss == "1234") {
        kirjauduAdmin();
    } else {
        kirjauduPerus();
    }
}
function kirjauduAdmin() {
    document.getElementById("kirjautuminen").style.display = "none";
    document.getElementById("aanestysNappulat").style.display = "block";
}
function kirjauduPerus() {
    document.getElementById("kirjautuminen").style.display = "none";
}
function uusiAanestys() {
    document.getElementById("uusi").style.display = "block";
}
function sulje() {
    document.getElementById("uusi").style.display = "none";
}