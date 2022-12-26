module.exports = function checkRequest(req, res, next) {
    let checkParams = paramsCheck(req.body);
    
    if(checkParams.error){
        return res.status(400)
            .json({
                error: true,
                messages: checkParams.errorMsg
            });
    }
    next();
};

function paramsCheck(params){
    let regex = /^[0-9]*$/;
    let errorMsg = [];
    console.log(regex.test(params.dependents));
    if(!params.age && !regex.test(params.age)){
        errorMsg.push('Age Must be a number!');
    }
    if(!params.dependents && !regex.test(params.dependents)){
        errorMsg.push('Please enter NUMBER of dependent!');
    }
    if(!params.income && !regex.test(params.income)){
        errorMsg.push('Income must be Number as well!');
    }
    if(!params.maritalStatus || (params.maritalStatus != 'single' && params.maritalStatus != 'married')){
        errorMsg.push('User must be single or married!');
    }
    let riskQuestions = params.riskQuestions;
    if(!riskQuestions || riskQuestions.length != 3 || !containsBool(riskQuestions)){
        errorMsg.push('Risk questions must be three and boolean!');
    }
    if(!params.house || !checkHouseValue(params.house)){
        errorMsg.push('If User has a house, it must be owned or mortagaed!');
    }
    if(!params.vehicle || !checkVehicleValue(params.vehicle)){
        errorMsg.push('User vehicle must have a years between 1885 and 2022!');
    }
    
    return {
        error: errorMsg.length > 0 ? true : false,
        errorMsg: errorMsg
    }
}

function containsBool(checkBool) {
    for (arrayEntry of checkBool) {
      if (typeof arrayEntry === 'boolean' || typeof arrayEntry === 'number') {
        return true;
      } 
    }
    return false;
}

function checkHouseValue(house){
    if(house == 0){
        return true;
    }
    else{
        if(house.hasOwnProperty('ownership_status') && (house.ownership_status == "owned" || house.ownership_status == "mortgaged")){
            return true;
        }
        return false;
    }
}

function checkVehicleValue(vehicle){
    if(vehicle == 0){
        return true;
    }
    else{
        if(vehicle.hasOwnProperty('year') || (vehicle.year < 2022 && vehicle.year > 1885)){
            return true;
        }
        return false;
    }
}