const ctr = document.getElementById("theChart").getContext('2d');
const nameIn = document.querySelector(".nameVal");
const theAdd = document.querySelector(".add");
const errorMes = document.querySelector(".errorr");
const nameSect = document.querySelector(".names");
let templateSource = document.querySelector(".userTemplate").innerHTML;
let userTemplate = Handlebars.compile(templateSource);

const theFactory = factory();

let vac = 100;
let occ = 0;

if (localStorage["theList"] && localStorage["maxCap"] && localStorage["occupied"]) {
    occ = Number(localStorage["occupied"]);
    vac = Number(localStorage["maxCap"]);
    let theListt = JSON.parse(localStorage["theList"]);

    theFactory.resettingLocalStorage(occ, vac, theListt);
    // limit.innerHTML = factoryLogic.values().allowedCap;
    let userData = { 
        names : theFactory.values().goingList
    };
    
    userDataHTML = userTemplate(userData);
    nameSect.innerHTML = userDataHTML;
}

if (localStorage["maxCap"]) {
    vac = Number(localStorage["maxCap"]);

    theFactory.resetVac(vac);
    // limit.innerHTML = factoryLogic.values().allowedCap;
    let userData = { 
        names : theFactory.values().goingList
    };
    
    userDataHTML = userTemplate(userData);
    nameSect.innerHTML = userDataHTML;
}


let userData = { 
    names : theFactory.values().goingList
};

userDataHTML = userTemplate(userData);
nameSect.innerHTML = userDataHTML;

Chart.defaults.font.size = 20;
Chart.defaults.font.color = 'black';

let graph = new Chart (ctr, {
    type: 'doughnut',
    data: {
        labels: ['Occupied', 'Vacant'],
        datasets: [{
            label: '# of Votes',
            fontWeight: 'bold',
            data: [occ, vac],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 3,
            
        }]
    },
    options: {
        scale: {
            pointLabels :{
            fontStyle: "bolder",
            }
        }
    }
});

theAdd.addEventListener('click', function(){

    if (nameIn.value === "") {
        nameIn.classList.add("crimson");
        nameIn.value = "Please enter name"
        setTimeout(function(){
            nameIn.value = "";
            nameIn.classList.remove("crimson");
        }, 1500);

    } else if (theFactory.values().allowedCap === undefined) {

        // theError.innerHTML = factoryLogic.values().error;
        errorMes.innerHTML = "An event has not been set yet.";
        setTimeout(function(){
            errorMes.innerHTML = "";
        }, 1500);
        nameIn.value = "";

    } else if (theFactory.values().allowedCap === 0) {
    
        errorMes.innerHTML = "Maximum capacity reached";
        setTimeout(function(){
            errorMes.innerHTML = "";
        }, 1500);
        nameVal.value = "";

    } else {
        theFactory.addToList(nameIn.value);
        
        // limit.innerHTML = theFactory.values().allowedCap;

        localStorage["theList"] = JSON.stringify(theFactory.values().goingList);
        localStorage["maxCap"] = theFactory.values().allowedCap;
        localStorage["occupied"] = theFactory.values().occupied;

        nameIn.value = "";
        location.reload();
    }
});

function removeBtn(val) {
    theFactory.removeName(val);

    let userData = { 
        names : theFactory.values().goingList
        // names : theFactory.removeName(val)

    };
    
    userDataHTML = userTemplate(userData);
    nameSect.innerHTML = userDataHTML;

    localStorage["theList"] = JSON.stringify(theFactory.values().goingList);
    localStorage["maxCap"] = theFactory.values().allowedCap;
    localStorage["occupied"] = theFactory.values().occupied;
};