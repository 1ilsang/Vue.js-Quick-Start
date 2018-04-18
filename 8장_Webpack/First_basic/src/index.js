import calc from './utils/utility';

let x = 7;
let y = 5;
let str = `<h2>${x} + ${y} = ${calc.add(x,y)}</h2>`;

document.getElementById("app").innerHTML = str;