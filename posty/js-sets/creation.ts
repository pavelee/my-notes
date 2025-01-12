
// create a set by adding elements

const set1 = new Set();

set1.add(1);
set1.add(2);
set1.add(3);

console.log(set1);

// create a set by passing an array

const set2 = new Set([1, 2, 3])

console.log(set2);

// create set from set

const set3 = new Set([1, 2, 3])
const set4 = new Set(set3);

console.table([
  [set3, set4]
])

set4.add(15);

// IMPORTANT, set is not created from other set as copied reference, its a new object (reference)
console.table([
  [set3, set4]
])

// create set and clear it

const set5 = new Set([1, 2, 3]);

console.log(set5);

set5.clear();

console.log(set5);

set5.add(1);

console.log(set5);

// delete from set

const set6 = new Set([1, 1, 2, 3, 4, 5]);

console.log(set6);

set6.delete(1);

console.log(set6);

// create array from set

// could be useful to create unique array of element (sets will make it)
const set7 = new Set([1, 2, 3, 4, 5]);

console.log(Array.from(set7));
console.log([...set7]);