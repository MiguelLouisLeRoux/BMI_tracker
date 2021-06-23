const ctr = document.getElementById("theChart").getContext('2d');
const maximumCap = document.querySelector(".capacity-input");
const chartSect = document.querySelector(".theChart");
const limit = document.querySelector(".capLimit");
const addd = document.querySelector(".add");
const nameVal = document.querySelector(".nameVal");
const theError = document.querySelector(".errorr");
const counter = document.querySelector(".counter");

const factoryLogic = factory();

let occupiedVal = 0;
let vacantVal = 100;

if (localStorage["theList"] && localStorage["maxCap"] && localStorage["occupied"]) {
    occupiedVal = Number(localStorage["occupied"]);
    vacantVal = Number(localStorage["maxCap"]);
    let theList = JSON.parse(localStorage["theList"]);

    factoryLogic.resettingLocalStorage(occupiedVal, vacantVal, theList);
    limit.innerHTML = factoryLogic.values().allowedCap;
}

if (localStorage["maxCap"]) {
    vacantVal = Number(localStorage["maxCap"]);

    factoryLogic.resetVac(vacantVal);
    limit.innerHTML = factoryLogic.values().allowedCap;
}

Chart.defaults.font.size = 20;
Chart.defaults.font.color = 'black';

let graph = new Chart (ctr, {
    type: 'doughnut',
    data: {
        labels: ['Occupied', 'Vacant'],
        datasets: [{
            label: '# of Votes',
            fontWeight: 'bold',
            data: [occupiedVal, vacantVal],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                // 'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)'
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

maximumCap.addEventListener('change', function(){
    
    if (maximumCap.value < 10) {
        maximumCap.value = ""; 
    } else {
       limit.innerHTML = factoryLogic.setAllowedCap(maximumCap.value);
       vacantVal = factoryLogic.values().allowedCap;
       
    }

    localStorage["maxCap"] = factoryLogic.values().allowedCap;
    location.reload();
    
});

addd.addEventListener('click', function(){

    if (nameVal.value === "") {
        nameVal.classList.add("crimson");
        nameVal.value = "Please enter name"
        setTimeout(function(){
            nameVal.value = "";
            nameVal.classList.remove("crimson");
        }, 1500);

    // } else if (factoryLogic.values().allowedCap === 0) {
    } else if (factoryLogic.values().allowedCap === undefined) {

        theError.innerHTML = factoryLogic.values().error;
        setTimeout(function(){
            theError.innerHTML = "";
        }, 1500);
        nameVal.value = "";

    } else if (factoryLogic.values().allowedCap === 0) {
    
        theError.innerHTML = "Maximum capacity reached";
        setTimeout(function(){
            theError.innerHTML = "";
        }, 1500);
        nameVal.value = "";

    } else {
        factoryLogic.addToList(nameVal.value);
        
        limit.innerHTML = factoryLogic.values().allowedCap;

        localStorage["theList"] = JSON.stringify(factoryLogic.values().goingList);
        localStorage["maxCap"] = factoryLogic.values().allowedCap;
        localStorage["occupied"] = factoryLogic.values().occupied;

        nameVal.value = "";
        location.reload();
    }
});
