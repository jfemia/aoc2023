import * as fs from "fs";
import * as readline from "readline";

export function createInputStream(day: string) {
  const fileStream = fs.createReadStream(`./${day}/input.txt`);

  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
}
