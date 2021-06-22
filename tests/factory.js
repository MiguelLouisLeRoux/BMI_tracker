function factory() {
    let invitationList = [{Name: "Pete", going: 'yes'}, {Name: "Ben", going: 'yes'},{Name: "Charles", going: 'no'},{Name: "Sally", going: 'no'},{Name: "Polly", going: 'yes'},{Name: "Paige", going: 'no'},{Name: "Michael", going: 'no'},{Name: "Amber", going: 'no'},{Name: "Zena", going: 'yes'}];
    
    let venueCap;

    function values(){
        return{
            invitationList: invitationList,
            venueCap: venueCap,
        }
    }

    return {values,

    }
}