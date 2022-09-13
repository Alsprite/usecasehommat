document.addEventListener("click", voteclick);

function kirjaudu() {
    let ID = document.getElementById("ID").value;
    let ss = document.getElementById("salasana").value;

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
function kirjauduUlos() {
    document.getElementById("kirjautuminen").style.display = "block";
    document.getElementById("aanestysNappulat").style.display = "none";
}
function uusiAanestysDiv() {
    document.getElementById("uusi").style.display = "block";
}
function uusiAanestys() {
    init();
}
function suljeDiv() {
    document.getElementById("uusi").style.display = "none";
}
function init() {
    var nimi = document.getElementById("nimi").value;
    var vasta1 = document.getElementById("vastaus1").value;
    var vasta2 = document.getElementById("vastaus2").value;
    var votes = [];
    var vote = {
        aihe: nimi,
        options: [
            {
                "name" : vasta1,
                "votes" : 0
            },
            {
                "name" : vasta2,
                "votes": 0
            }
        ]
    }
    votes.push(vote);
    window.localStorage.setItem('votes', JSON.stringify(votes));
    console.log("init");   
}
function getVotes() {
    var votes = JSON.parse(window.localStorage.getItem('votes'));
    var voteDiv = document.getElementById("ala");

    votes.forEach(vote => {
        console.log(vote.aihe);
        var voteH2 = document.createElement("h2");
        var voteTopic = document.createTextNode(vote.aihe);
        var btnPoista = document.createElement("button");
        var btnPoistaText = document.createTextNode("Poista");
        var br = document.createElement("br");
        btnPoista.appendChild(btnPoistaText);
        voteH2.appendChild(btnPoista);
        voteH2.appendChild(br);
        voteH2.appendChild(voteTopic);

        let votenumber = 0;
        var optionList = document.createElement("ul");
        vote.options.forEach(option => {
            console.log(option);
            var optionElement = document.createElement("li");
            var optionText = document.createTextNode(option.name);
            var btnAani = document.createElement("button");

            var optionButton = document.createElement("button");
            optionButton.appendChild(optionText);
            optionButton.dataset('vote', votenumber);
            optionElement.appendChild(optionButton);
            

            var btnAaniText = document.createTextNode("Äänestä");
            optionElement.appendChild(optionText);
            btnAani.appendChild(btnAaniText);
            optionList.appendChild(btnAani);
            optionList.appendChild(optionElement);
            
        })
        voteDiv.appendChild(voteH2);
        voteDiv.appendChild(optionList);
        votenumber++;
    });
    document.getElementById("uusi").style.display = "none";
}
function giveVote(voteId, optionId) {
    var votes = JSON.parse(window.localStorage.getItem('votes'));
    votes[voteId].options[optionId].votes++;
    window.localStorage.setItem('votes', JSON.stringify(votes));
}
function delVote(voteId) {
    var votes = JSON.parse(window.localStorage.getItem('votes'));
    delete votes[voteId];
}
function voteclick(event) {
    console.log("Yritit äänestää");
    console.log(event.target);

}