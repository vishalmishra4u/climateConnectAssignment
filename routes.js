const UserRiskProfile = require('./userRiskProfile');
const checkRequest = require('./checkRequest');

module.exports = function(router) {
    router.post('/getRiskProfile', checkRequest, UserRiskProfile.getUserRiskProfile);
}