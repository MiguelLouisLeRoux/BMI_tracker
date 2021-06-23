var namesListElem = document.querySelector('.acceptedList')
var cancelElem = document.querySelector('.removeList')

const TemplateSource = document.querySelector(".userTemplate").innerHTML;
let template = Handlebars.compile(TemplateSource);


var namesGoingInstance = Factory();

// var userData = {
//     name : namesGoingInstance.values().goingList 
// }

// userDataHTML = template(userData);
// namesListElem.innerHTML = userDataHTML;

// if(namesGoingInstance.getNameList()){
//     namesGoingInstance.innerHTML = greetingInstance.getNameList()
  
//   }
// namesListElem.addEventListener('click', function(){
//     namesListElem.innerHTML = namesGoingInstance.getNameList()
// })

var getList = namesGoingInstance.getNameList();
for(let i = 0; i < getList.length; i++){
    var namesCaptured = getList[i];
    var nameDiv = document.createElement('div')
    nameDiv.textContent = namesCaptured;
    nameDiv.value = namesCaptured;
    namesListElem.appendChild(nameDiv)
}

cancelElem.addEventListener('click', function(){
    var removeList = namesGoingInstance.getNameList();
for(let i = 0; i < removeList.length; i++){
    var namesRemoved = removeList[i];
    var removeName = document.createElement('div')
    removeName.textContent = namesRemoved;
    removeName.value = namesRemoved;
    cancelElem.removeChild(removeName)
}
})


function addName(value) {

    
}