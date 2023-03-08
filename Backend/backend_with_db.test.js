const myFunctions = require('./backend_with_db.js');

/* test sum function */
test('Testing sum two positive integers', () => {
  const target = 30;
  const result = myFunctions.sum(12, 18);
  expect(target).toBe(result);
});

test('Testing sum two negative integers', () => {
  const target = -30;
  const result = myFunctions.sum(-12, -18);
  expect(target).toBe(result);
});

test('Testing sum one letter one number', () => {
    expect(() => {
        myFunctions.sum("1", 2);
    }).toThrow(TypeError("Please supply only numbers"));
});

test('Testing sum two letters', () => {
    expect(() => {
        myFunctions.sum("a", "b");
    }).toThrow(TypeError("Please supply only numbers"));
});

/* test div function */
test('Testing div two positive integers', () => {
    const target = 6;
    const result = myFunctions.div(30, 5);
    expect(target).toBe(result);
});
  
test('Testing div two negative integers', () => {
    const target = 6;
    const result = myFunctions.div(-30, -5);
    expect(target).toBe(result);
});
  
test('Testing div by 0', () => {
    expect(() => {
        myFunctions.div(5, 0);
    }).toThrow(RangeError("Cannot divide by 0"));
});

test('Testing div two letters', () => {
    expect(() => {
        myFunctions.div("a", "b");
    }).toThrow(TypeError("Please supply only numbers"));
});

test('Testing contains with number', () => {
    const target = "abcd4f";
    const result = myFunctions.containsNumbers(target);
    expect(result).toBeTruthy();
});

test('Testing contains with number', () => {
    const target = "abdefgh";
    const result = myFunctions.containsNumbers(target);
    expect(result).toBeFalsy();
});

test('First character is number', () => {
    const target = "5abcdef";
    const result = myFunctions.containsNumbers(target);
    expect(result).toBeTruthy();
});

test('String not supplied', () => {
    expect(() => {
        myFunctions.containsNumbers(543);
    }).toThrow(TypeError("Please only provide a string")
    );
});

test('Empty string', () => {
    const result = myFunctions.containsNumbers("");
    expect(result).toBeFalsy();
});

test('Empty string', () => {
    const result = myFunctions.containsNumbers("");
    expect(result).toBeFalsy();
});