/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
  let p = new Promise(function (resolve) {
    setTimeout(() => {
      resolve("abc");
    }, n * 1000);
  });
  return p;
}

let pr = wait(2);
pr.then(() => {
  console.log("resolved");
  console.log(pr);
});

console.log("end");
