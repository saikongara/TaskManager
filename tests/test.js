const assert = require('assert');
const { utilityFunction } = require('../src/utils/UtilityName');

describe('Utility Function Tests', function() {
    it('should return expected output', function() {
        const result = utilityFunction('input');
        assert.strictEqual(result, 'expectedOutput');
    });
});
