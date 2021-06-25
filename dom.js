const ctr = document.getElementById("theChart").getContext('2d');
const maximumCap = document.querySelector(".capacity-input");
const chartSect = document.querySelector(".theChart");
const limit = document.querySelector(".capLimit");
const addd = document.querySelector(".add");
const nameVal = document.querySelector(".nameVal");
const theError = document.querySelector(".errorr");
const counter = document.querySelector(".counter");
const going = document.querySelector(".theListt");
const perc = document.querySelector(".perc-input");
const calc = document.querySelector(".calc");
const er = document.querySelector(".dError");
const update = document.querySelector(".update");
let templateSource = document.querySelector(".userTemplate").innerHTML;
let userTemplate = Handlebars.compile(templateSource);

const factoryLogic = factory();

let userData = { 
    names : factoryLogic.values().goingList
};

userDataHTML = userTemplate(userData);
going.innerHTML = userDataHTML;

let occupiedVal = 0;
let vacantVal = 100;

if (localStorage["theList"] && localStorage["maxCap"] && localStorage["occupied"]) {
    occupiedVal = Number(localStorage["occupied"]);
    vacantVal = Number(localStorage["maxCap"]);
    let theList = JSON.parse(localStorage["theList"]);

    factoryLogic.resettingLocalStorage(occupiedVal, vacantVal, theList);
    limit.innerHTML = factoryLogic.values().allowedCap;

    let userData = { 
        names : factoryLogic.values().goingList
    };
    
    userDataHTML = userTemplate(userData);
    going.innerHTML = userDataHTML;
}

if (localStorage["maxCap"]) {
    vacantVal = Number(localStorage["maxCap"]);

    factoryLogic.resetVac(vacantVal);
    limit.innerHTML = factoryLogic.values().allowedCap;

    let userData = { 
        names : factoryLogic.values().goingList
    };
    
    userDataHTML = userTemplate(userData);
    going.innerHTML = userDataHTML;
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

calc.addEventListener('click', function(){
    
    if (maximumCap.value == "") {

        maximumCap.value = "Enter a value";
        maximumCap.classList.add("crimson");
        setTimeout(function(){
            maximumCap.value = "";
            maximumCap.classList.remove("crimson");
        }, 1500);
        return
    } 
    if (perc.value == "") {

        perc.value = "Enter a value";
        perc.classList.add("crimson");
        setTimeout(function(){
            perc.value = "";
            perc.classList.remove("crimson");
        }, 1500);
        return
    } 
    if (maximumCap.value == "" && perc.value == "") {

        er.innerHTML = "Enter values bellow";
        er.classList.add("crimson");
        setTimeout(function(){
            er.innerHTML = "";
            er.classList.remove("crimson");
        }, 1500);
        return
    } else {

       limit.innerHTML = factoryLogic.setAllowedCap(maximumCap.value, perc.value);
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

update.addEventListener("click", function(){
    location.reload();
})
