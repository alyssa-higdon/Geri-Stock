temp = new Date(0);
temp1 = Date.now();
temp.setUTCSeconds(temp1/1000);




const timeElapsed = Date.now();
const today = new Date(timeElapsed);
today.toISOString(); // "2020-06-13T18:30:00.000Z"




console.log(today)
console.log(temp)
console.log(temp1)