function factory() {
    
    //Lhomlas acceptance list
    let goingList = [];

    let occupied = 0;
    // let allowedCap = 0;
    let allowedCap;


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
            let trim = name.trim();
            let upper = trim.charAt(0).toUpperCase() + trim.slice(1)
            if (/^[A-Za-z]+$/.test(upper) || /^[A-Za-z]\s^[A-Za-z]+$/.test(upper)){
                goingList.push(upper);
                allowedCap--; 
            }    
        }
        occupied = goingList.length;
    }

    function removeName(val) {
        for (let i = 0; i < goingList.length; i++) {
            let itt = goingList[i];

            if (val === itt) {

                let index = goingList.indexOf(val);
                goingList.splice(index, 1);
                allowedCap++;
                return goingList;
            }
        } 
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
            removeName,
    }
}