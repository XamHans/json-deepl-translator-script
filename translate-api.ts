import * as deepl from "deepl-node";
import { TargetLanguageCode } from "deepl-node";
const fs = require("fs");

export interface Translation {
  translateText: (
    text: string,
    targetLang: TargetLanguageCode
  ) => Promise<string>;
}
export class TranslateService implements Translation {
  authKey = process.env.DEEPL_API_KEY ?? "YOUR_DEEPL_API_KEY"; // Replace with your key
  translator: deepl.Translator;

  constructor() {
    this.translator = new deepl.Translator(this.authKey);
  }

  translateText = async (text: string, targetLang: string): Promise<string> => {
    if (targetLang === "en") {
      targetLang = "en-US";
    }
    const results = await this.translator.translateText(
      text,
      null,
      targetLang as TargetLanguageCode
    );
    return results.text;
  };
}

const translateService = new TranslateService();

export { translateService };
