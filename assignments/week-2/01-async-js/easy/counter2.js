const printTime = () => {
  let date = new Date();
  console.log(
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  );
  setTimeout(printTime, 1000);
};

printTime();
