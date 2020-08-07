const assert = require('assert');
const {getDatabaseNames} = require('../app');

describe('getDatabaseNames()', () => {
  it('should include "testdb"', async () => {
    const result = await getDatabaseNames();
    assert.strictEqual(result.includes('testdb'), true);
  });
});
