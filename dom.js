const ctr = document.getElementById("theChart").getContext('2d');
const maximumCap = document.querySelector(".capacity-input");
const chartSect = document.querySelector(".theChart");
const limit = document.querySelector(".capLimit");
const addd = document.querySelector(".add");
const nameVal = document.querySelector(".nameVal");
const theError = document.querySelector(".errorr");

const factoryLogic = factory();


Chart.defaults.font.size = 20;
Chart.defaults.font.color = 'black';

let graph = new Chart (ctr, {
    type: 'doughnut',
    data: {
        labels: ['Occupied', 'Vacant'],
        datasets: [{
            label: '# of Votes',
            fontWeight: 'bold',
            data: [0, 100],
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
    }
});

addd.addEventListener('click', function(){
    if (nameVal.value === "") {
        nameVal.classList.add("crimson");
        nameVal.value = "Please enter name"
        setTimeout(function(){
            nameVal.value = "";
            nameVal.classList.remove("crimson");
        }, 1500);
    } else if (factoryLogic.values().allowedCap === 0) {
        theError.innerHTML = factoryLogic.values().error;
        setTimeout(function(){
            theError.innerHTML = "";
        }, 1500);
        nameVal.value = "";
    } else {
        factoryLogic.addToList(nameVal.value);
        // console.log(factoryLogic.values().allowedCap);
        limit.innerHTML = factoryLogic.values().allowedCap;

        nameVal.value = "";
    }
});


