const { utilityFunction } = require('../utils/UtilityName');

function serviceFunction(data) {
    const result = utilityFunction(data);
    return result;
}

module.exports = { serviceFunction };