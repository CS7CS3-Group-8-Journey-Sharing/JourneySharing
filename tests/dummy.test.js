const dummyFunction = require('../dummy')

test('adds 1 + 2 to equal 3', () => {
    expect(dummyFunction(1, 2)).toBe(3);
});