const fs = require("fs");
const fsPromises = require("fs").promises;

fs.readFile("a.txt", "utf-8", (err, data) => {
  console.log(data);
});

console.log("end cb");

fsPromises.readFile("a.txt", "utf-8").then((data) => {
  console.log(data);
});

console.log("end promise");

async function printFile() {
  const data = await fsPromises.readFile("a.txt", "utf-8");
  console.log(data);
}

const writeFile = async (data) => {
  await fsPromises.writeFile("a.txt", data);
};

async function readFileAndWrite() {
  try {
    // Read the content of the file
    let data = await fsPromises.readFile("a.txt", "utf-8");
    console.log("File content:", data);

    // Set a timeout of 1 second (1000 milliseconds)
    let p = new Promise((resolve) => setTimeout(resolve, 1000));
    await p;

    // Append some text to the file
    const newText = "\nAppended text after 1 second.";
    await fsPromises.appendFile("a.txt", newText, "utf-8");

    // Read the content of the file
    data = await fsPromises.readFile("a.txt", "utf-8");
    console.log("File content:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

readFileAndWrite();
console.log("end async/await");
