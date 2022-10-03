var adminko = 0;
var votes = [];
window.localStorage.setItem('votes', JSON.stringify(votes));

function kirjaudu() {
    let ID = document.getElementById("ID").value;
    let ss = document.getElementById("salasana").value;

    if (ID == "admin" && ss == "1234") {
        kirjauduAdmin();
        adminko = 1;
        console.log("admin");
    } else {
        kirjauduPerus();
        adminko = 0;
        console.log("perus");
    }
}
function kirjauduAdmin() {
    document.getElementById("kirjautuminen").style.display = "none";
    document.getElementById("ylaNappulat").style.display = "inline";
    if (document.getElementById("adminNappulat").style.display = "none") {
        document.getElementById("adminNappulat").style.display = "inline";
    }
    const poistoButtonit = document.querySelectorAll(".poisto");
    poistoButtonit.forEach(luettelokohta => {
        luettelokohta.style.display = "block";
    })
}
function kirjauduPerus() {
    document.getElementById("kirjautuminen").style.display = "none";
    document.getElementById("ylaNappulat").style.display = "inline";
    document.getElementById("adminNappulat").style.display = "none";
}
function kirjauduUlos() {
    document.getElementById("kirjautuminen").style.display = "inline-block";
    document.getElementById("ylaNappulat").style.display = "none";
    const poistoButtonit = document.querySelectorAll(".poisto");
    poistoButtonit.forEach(luettelokohta => {
        luettelokohta.style.display = "none";
    })
    adminko = 0;
}
function uusiAanestysDiv() {
    document.getElementById("uusi").style.display = "block";
}
function suljeDiv() {
    document.getElementById("uusi").style.display = "none";
}
function init() {
    var nimi = document.getElementById("nimi").value;
    var vasta1 = document.getElementById("vastaus1").value;
    var vasta2 = document.getElementById("vastaus2").value;
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
    var voteDiv = document.createElement("div");
    document.getElementById("kokonaisuus").innerHTML = "";
    voteDiv.innerHTML = "";
    voteDiv.className = "mihinluodaanaanestykset";
    voteDiv.style.display = "block";
    var votes = JSON.parse(window.localStorage.getItem('votes'));
    var voteNumber = 0;
    
    votes.forEach(vote => {
        //Äänestyksen aiheen tulostus
        var poistoBtn = document.createElement("button");
        var poistoBtnText = document.createTextNode("Poista");
        poistoBtn.className = "poisto";
        var voteH2 = document.createElement("h1");
        var voteTopic = document.createTextNode(vote.aihe);
        voteH2.appendChild(voteTopic);
        //Poisto-button
        poistoBtn.addEventListener("click", delClick);
        poistoBtn.appendChild(poistoBtnText);
        voteDiv.appendChild(poistoBtn);
        
        var optionList = document.createElement("ul");
        var optionNumber = 0;
        vote.options.forEach(option => {
            //Vaihtoehtojen tulostus
            var optionElement = document.createElement("li");
            var optionText1 = document.createElement("h3");
            var optionText2 = document.createTextNode(option.name);
            optionText1.appendChild(optionText2);
            optionElement.appendChild(optionText1);
            //h4-teksti ja span
            var h4 = document.createElement("h4");
            var h4text = document.createTextNode(option.name + " äänestykset: ");
            h4.appendChild(h4text);
            optionElement.appendChild(h4);
            //Span
            var span = document.createElement("span");
            span.value = option.votes;
            var spanValue = document.createTextNode(span.value);
            span.appendChild(spanValue);
            optionElement.appendChild(span);
            //Äänestys-button
            var pre = document.createElement("pre");
            optionElement.appendChild(pre);
            var btnAani = document.createElement("button");
            var btnAaniText = document.createTextNode("Äänestä");
            btnAani.addEventListener("click", voteClick);
            btnAani.appendChild(btnAaniText);
            btnAani.dataset.vote = voteNumber;
            btnAani.dataset.option = optionNumber;
            poistoBtn.dataset.poisto1 = voteNumber;
            btnAani.id = "aanestys";
            optionElement.appendChild(btnAani);
            optionList.appendChild(optionElement);
            optionNumber++;
        })
        voteDiv.appendChild(voteH2);
        voteDiv.appendChild(optionList);
        document.getElementById("kokonaisuus").appendChild(voteDiv);
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
function delVote(poisto1) {
    var votes = JSON.parse(window.localStorage.getItem('votes'));
    votes.splice(poisto1, 1);
    window.localStorage.setItem("votes", JSON.stringify(votes));
    getVotes();
}
function voteClick(event) {
    if (event.target.dataset.vote) {
        var voteSpan = event.target.previousElementSibling.previousElementSibling;
        voteSpan.innerHTML = giveVote(event.target.dataset.vote, event.target.dataset.option);
    }
}
function delClick(event) {
    delVote(event.target.dataset.poisto1);
}