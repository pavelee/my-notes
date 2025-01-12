
const set1 = new Set([1, 2, 3, 4, 5]);
console.log(set1.size);

const set2 = new Set([1, 2, 3, 4, 5]);
console.log(set2.has(2));
console.log(set2.has(1222));

const set3 = new Set([1, 2, 3, 4, 5]);
console.log(set3.entries());
console.log(set3.keys())
console.log(set3.values())


const setA = new Set([1,2,3,4,5,6]);
const setB = new Set([2,3,10,50,60]);

console.log('Union:', setA.union(setB));
console.log('Intersection:', setA.intersection(setB));
console.log('Difference:', setA.difference(setB));
console.log('Symmetric Difference:', setA.symmetricDifference(setB));

const names1 = new Set(['John', 'Jane', 'Alice', 'Bob']);
const names2 = new Set(['John', 'Jane']);
const names3 = new Set(['Zoe']);

console.log(`Superset: ${names1.isSupersetOf(names2)}`);
console.log(`Subset: ${names1.isSubsetOf(names2)}`);
console.log(`Subset: ${names2.isSubsetOf(names1)}`);
console.log(`Disjoint names2: ${names1.isDisjointFrom(names2)}`);
console.log(`Disjoint names3: ${names1.isDisjointFrom(names3)}`);