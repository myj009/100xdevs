const fs = require("fs").promises;

const cleanFile = async () => {
  let text = await fs.readFile("file.txt", "utf-8");
  console.log(text);

  text = text.replace(/\s+/g, " ").trim();
  await fs.writeFile("file.txt", text);

  text = await fs.readFile("file.txt", "utf-8");
  console.log(text);
};

cleanFile();
