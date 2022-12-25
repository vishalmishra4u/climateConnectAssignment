module.exports = {
    getUserRiskProfile : getUserRiskProfile
};

function getUserRiskProfile(req, res){
    const riskScore = {
        "auto": '',
        "disability": '',
        "home": '',
        "life": ''
    };

    let data = req.query;
    let age = JSON.parse(data.age),
        riskQuestions = JSON.parse(data.riskQuestions),
        income = JSON.parse(data.income),
        house = JSON.parse(data.house),
        dependents = JSON.parse(data.dependents),
        vehicle = JSON.parse(data.vehicle);

    let baseScoreSum = riskQuestions.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
    });

    const baseScore = {
        "auto": baseScoreSum,
        "disability": baseScoreSum,
        "home": baseScoreSum,
        "life": baseScoreSum
    };

    if(age < 30){
        for(let score in baseScore){
            baseScore[score] -= 2;
        }
    }else if(age > 30 && age <= 40){
        for(let score in baseScore){
            baseScore[score] -= 1;
        } 
    }
    if(income > 200000){
        for(let score in baseScore){
            baseScore[score] -= 1;
        }
    }
    if(house.ownership_status == "mortgaged"){
        baseScore['home'] += 1;
        baseScore['disability'] += 1;
    }
    if(dependents > 0){
        baseScore['life'] += 1;
        baseScore['disability'] += 1;
    }
    if(data.maritalStatus == "married"){
        baseScore['life'] += 1;
        baseScore['disability'] -= 1;
    }
    if(new Date().getFullYear() - JSON.parse(vehicle.year) < 5){
        baseScore['auto'] += 1;
    }

    for(let score in baseScore){
        if(baseScore[score] <= 0){
            riskScore[score] = "economic";
        }
        else if(baseScore[score] == 1 || baseScore[score] == 2){
            riskScore[score] = "regular";
        }
        else{
            riskScore[score] = "responsible";
        }
    }

    if(income == 0){
        riskScore.disability = "ineligible";
    }
    if(data.vehicle == 0){
        riskScore.auto = "ineligible";
    }
    if(data.house == 0){
        riskScore.home = "ineligible";
    }
    if(age > 60){
        riskScore['disability'] = "ineligible";
        riskScore['life'] = "ineligible";
    }
    
    res.send(riskScore);
}