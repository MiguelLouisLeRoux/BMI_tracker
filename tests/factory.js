function factory() {
    
    //Lhomlas acceptance list
    let goingList = [];

    let occupied = 0;
    let allowedCap = 0;

    //Error message
    let error = "Please enter maximum capacity of a venue to register an event";

    function setAllowedCap(val){
        let limit = val * 66 / 100;
        allowedCap = Math.round(limit);

        if (goingList.length != 0) {
            allowedCap -= goingList.length;
        }

        return allowedCap;
    }

    function addToList(name) {
        if (allowedCap != 0){
            if (/^[A-Za-z]+$/.test(name) || /^[A-Za-z]\s^[A-Za-z]+$/.test(name)){
                goingList.push(name);
                allowedCap--; 
            }    
        }
        occupied = goingList.length;
    }

    function resettingLocalStorage(occu, vacant, list) {
        goingList = list;
        occu = occupied;
        allowedCap = vacant;
    }

    function resetVac(val) {
        allowedCap = val;
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
            resettingLocalStorage,
            resetVac,
    }
}