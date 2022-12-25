const UserRiskProfile = require('./userRiskProfile');
const checkRequest = require('./checkRequest');

module.exports = function(router) {
    router.get('/getRiskProfile', checkRequest, UserRiskProfile.getUserRiskProfile);
}