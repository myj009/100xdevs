function waitOneSecond() {
  console.log("in 1");
  return new Promise(function (resolve) {
    setTimeout(() => {}, 1000);
  });
}

function waitTwoSecond() {
  console.log("in 2");
  return new Promise(function (resolve) {
    setTimeout(() => {}, 2000);
  });
}

function waitThreeSecond() {
  console.log("in 3");
  return new Promise(function (resolve) {
    setTimeout(() => {}, 3000);
  });
}

function calculateTime() {
  var start = new Date().getTime();
  waitOneSecond()
    .then(() => {
      console.log("one second resolved");
      return waitTwoSecond();
    })
    .then(() => {
      console.log("two second resolved");
      return waitThreeSecond();
    })
    .then(() => {
      console.log("three second resolved");
      var end = new Date().getTime();
      console.log(`Time to complete is ${end - start} milliseconds`);
    });
}

calculateTime();
