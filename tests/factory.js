function factory() {
    
    //Lhomlas acceptance list
    let goingList = [];

    let occupied = 0;
    let allowedCap = 0;

    //Error message
    let error = "Please enter maximum capacity of a venue to register an event";

    function setAllowedCap(val){
        allowedCap = val/2;
        return allowedCap;
    }

    function addToList(name) {
        if (allowedCap != 0){
            goingList.push(name);
            allowedCap--;
            occupied++;
        }
    }


    function values(){
        return{
            occupied: occupied,
            goingList: goingList,
            allowedCap: allowedCap,
            error: error,
        }
    }

    return {values,
            setAllowedCap,
            addToList,

            

    }
}