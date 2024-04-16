// destrucutring

const object = { a: "a", b: "b", c: "c" };
const { a, b, c, d } = object;
d; // it is undefined

// descructuring array

const array = ["test", "test1", "test2"];
// możemy zdestrukturyzować tablicę w taki sposób
const [pierwszyElement, drugiElement, trzeciElement] = array;

// rest/spread operator

const array1 = ["test", "test1", "test2"];
// możemy zdestrukturyzować tablicę w taki sposób
const [pierwszyElement1, drugiElement2, trzeciElement3, ...pozostale] = array;
pozostale; // pusta tablica

const [pierwszyElement12, ...pozostale1] = array;
pozostale1; // ["test1", "test2"]

// natomiast nie możemy tego zrobić, spread operator musi być ostatni

// const [pierwszyElement123, ...pozostale2, ostatniElement] = array;

// możemy wykorzystać spread aby dodać element do tablicy

const array2 = ["test", "test1", "test2"];
const array3 = [...array2, "test3"]; // na końcu tablicy
const array4 = ["test4", ...array2]; // na początku tablicy

// spread operator działa również na obiektach

const object1 = { a: "a", b: "b" };

const object2 = { ...object1, c: "c" }; // dodajemy nową wartość do obiektu

// nadpisanie wartości w obiekcie

const object3 = { ...object1, a: "d" }; // nadpisujemy wartość a
const object4 = { a: "d", ...object1 }; // nadpisujemy wartość a

// literals

const literal = `${object1.a} ${object1.b}`;

// w środku literału możemy wykonywać operacje i wywoływać funkcje

const literal1 = `${object1.a} ${object1.b.toUpperCase()}`;

// ternaries

const x = true ? "true" : "false";

// możemy to wykonrzystać w literałach

const literal2 = `${object1.a} ${object1.b.toUpperCase()} ${x ? "true" : "false"}`;