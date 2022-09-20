document.addEventListener("click", voteClick);

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
    document.getElementById("ylaNappulat").style.display = "inline";
    if (document.getElementById("adminNappulat").style.display = "none") {
        document.getElementById("adminNappulat").style.display = "inline";
    }
}
function kirjauduPerus() {
    document.getElementById("kirjautuminen").style.display = "none";
    document.getElementById("ylaNappulat").style.display = "inline";
    document.getElementById("adminNappulat").style.display = "none";
}
function kirjauduUlos() {
    document.getElementById("kirjautuminen").style.display = "block";
    document.getElementById("ylaNappulat").style.display = "none";
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
    var voteDiv = document.getElementById("mihinluodaanaanestykset");
    var voteNumber = 0;
    var optionNumber = 0;
    votes.forEach(vote => {
        var voteH2 = document.createElement("h1");
        var voteTopic = document.createTextNode(vote.aihe);
        voteH2.appendChild(voteTopic);

        
        var optionList = document.createElement("ul");
        vote.options.forEach(option => {
            console.log(option);
            var optionElement = document.createElement("li");
            var optionText1 = document.createElement("h3");
            var optionText2 = document.createTextNode(option.name);
            optionText1.appendChild(optionText2);
            optionElement.appendChild(optionText1);
            var h4 = document.createTextNode(option.name + " äänestykset: " + option.votes);
            optionElement.appendChild(h4);
            var br = document.createElement("br");
            optionElement.appendChild(br);
            var btnAani = document.createElement("button");
            var btnAaniText = document.createTextNode("Äänestä");
            btnAani.appendChild(btnAaniText);
            btnAani.dataset.vote = voteNumber;
            btnAani.dataset.option = optionNumber;
            optionElement.appendChild(btnAani);

            optionList.appendChild(optionElement);
            optionNumber++;
        })
        voteDiv.appendChild(voteH2);
        voteDiv.appendChild(optionList);
        voteNumber++;
    });
    document.getElementById("uusi").style.display = "none";
}
function giveVote(voteId, optionId) {
    var votes = JSON.parse(window.localStorage.getItem('votes'));
    votes[voteId].options[optionId].votes++;
    window.localStorage.setItem('votes', JSON.stringify(votes));

    return votes[voteId].options[optionId].votes;
}
function delVote() {
    var votes = JSON.parse(window.localStorage.getItem('votes'));
    delete votes;
}
function voteClick(event) {
    if (event.target.dataset.vote) {
        var voteDiv = event.target.parentElement.nextElementSibling;
        voteDiv.innerhtml = giveVote(event.target.dataset.vote, event.target.dataset.option);
    }
}
