var time = 10;
var timer = setInterval(() => {
  process.stdout.write(`${time}...`);
  time--;
  if (time == 0) {
    clearInterval(timer);
  }
}, 1000);

var db = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("db completed in 10 sec");
  }, 10000);
});
var fb = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("fb completed in 5 sec");
  }, 5000);
});
var crm = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("crm completed in 2 sec");
  }, 2000);
});
var adWords = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("adWords completed in 1 sec");
  }, 1000);
});

Promise.all([crm, adWords, fb, db]).then(values => {
  console.log("\n"+values+"\n");
});
