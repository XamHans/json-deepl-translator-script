import { translateService } from "./translate-api";

const fs = require("fs");

async function mirrorObject(obj, targetLang) {
  const mirroredObj = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      mirroredObj[key] = await mirrorObject(value, targetLang);
    } else {
      mirroredObj[key] = await translateService.translateText(
        value as string,
        targetLang
      );
    }
  }

  return mirroredObj;
}

async function mirrorJsonFileWithTranslation(
  inputFilename,
  outputFilename,
  targetLang: string
) {
  // Read the JSON file
  const fileData = fs.readFileSync(inputFilename);
  const jsonData = JSON.parse(fileData);

  // Create a mirrored object structure
  const mirroredData = await mirrorObject(jsonData, targetLang);

  // Write the mirrored data to a new file
  fs.writeFileSync(outputFilename, JSON.stringify(mirroredData, null, 2));

  console.log("Mirroring complete!");
}

(async () => {
  const fileNames = ["my-workshops"];
  const targetLangs = ["en"] as string[];
  const fileName = fileNames[0];
  for (const val in targetLangs) {
    const targetLang = targetLangs[val];
    console.log(
      `./locales/en/${fileName}.json`,
      `./locales/${targetLang}/${fileName}.json`
    );
    await mirrorJsonFileWithTranslation(
      `./locales/de/${fileName}.json`,
      `./locales/${targetLang}/${fileName}.json`,
      targetLang
    );
  }
})();
