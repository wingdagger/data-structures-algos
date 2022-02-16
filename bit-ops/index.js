let i=1;

for (let j=1; j<31; j++) {
    i |= i << 1;
}

// i = i + i + i + i;

console.log("i: " + i);

let min = 1 << 31;
console.log("MIN: " + min);