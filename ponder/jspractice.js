const PI = 3.14

let radius = 3;

let area;

area = radius * radius * PI;
 
console.log (area);
radius = 20;

area = radius * radius * PI;

console.log(area);

const one = 1;
const two = '2';

let result = one * two;

console.log(result);

result = one + number(two);
console.log(result);

let globavariable = "I'm global";

function myFunction(){
    let blockvariable = "I am local or block level";
    console.log(blockvariable);
}
console.log(blockvariable)
console.log(globavariable)

