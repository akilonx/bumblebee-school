import { writeFile } from "fs/promises";
import seedDataGenerator from "./generateNewJiran";

const writeSeedToFile = () => {
  const records = seedDataGenerator();

  writeFile("./seedData/newJiran.json", JSON.stringify(records));
};

writeSeedToFile();
