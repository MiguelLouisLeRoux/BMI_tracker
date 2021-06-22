function factory() {
    let invitationList = [{Name: "Pete", going: 'yes'}, {Name: "Ben", going: 'yes'},{Name: "Charles", going: 'no'},{Name: "Sally", going: 'no'},{Name: "Polly", going: 'yes'},{Name: "Paige", going: 'no'},{Name: "Michael", going: 'no'},{Name: "Amber", going: 'no'},{Name: "Wendy", going: 'yes'},{Name: "Lucile", going: 'yes'},{Name: "Jeanette", going: 'yes'},{Name: "Mercy", going: 'yes'},{Name: "Arnette", going: 'yes'},{Name: "Domenica", going: 'yes'},{Name: "Marlen", going: 'yes'},{Name: "Emilia", going: 'yes'}, {name:'Myra' , going:"yes"}];
    
    let goingList = [];
    let vacant = 0;
    let occupied = 0;
    let allowedCap = 0;

    function setValues(capValue, lockdownValue){
        if (lockdownValue === 2) {
            allowedCap = capValue/2;
        }
    }

    function filter(){
        invitationList.forEach((val) =>{
            if (goingList.length < allowedCap && val.going === 'yes') {
                goingList.push(val);
            }
        });
    }

    function values(){
        return{
            invitationList: invitationList,
            vacant: vacant,
            occupied: occupied,
            goingList: goingList,
            allowedCap: allowedCap,
        }
    }

    return {values,
            filter,
            setValues,

    }
}