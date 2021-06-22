function factory() {
    let invitationList = [{Name: "Pete", going: 'yes'}, {Name: "Ben", going: 'yes'},{Name: "Charles", going: 'no'},{Name: "Sally", going: 'no'},{Name: "Polly", going: 'yes'},{Name: "Paige", going: 'no'},{Name: "Michael", going: 'no'},{Name: "Amber", going: 'no'},{Name: "Zena", going: 'yes'}];
    
    

    function values(){
        return{
            invitationList: invitationList,
        }
    }

    return {values,

    }
}