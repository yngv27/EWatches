
let batRdgs = [];
let batBurn = [];
//let batAvgs = [];
let oldBatAvg = 0;

let avgInt = setInterval(()=>{
  if(batRdgs.length > 10) batRdgs.shift();
  batRdgs.push(analogRead(D30));
}, 10000);

let batAvg = () => { 
  return batRdgs.reduce( (prev, curr) => prev + curr) / batRdgs.length;
};

let checkInt = setInterval(()=> {
  let newBatAvg = batAvg();
  if(oldBatAvg) batBurn.push(oldBatAvg - newBatAvg);
  oldBatAvg = newBatAvg;
}, 60000);

