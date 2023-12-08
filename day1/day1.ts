import { reverseString } from "../utils/string";
import { createInputStream } from "../utils/file";

(async function () {
  const rl = createInputStream("day1");

  const numberWords: Record<string, string> = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  const anyNumberWord = Object.keys(numberWords).join("|");

  const firstNumber = new RegExp(`(\\d|${anyNumberWord})`);
  const lastNumber = new RegExp(`(\\d|${reverseString(anyNumberWord)})`);

  let sum = 0;

  for await (const line of rl) {
    const matchedFirst = line.match(firstNumber)[1];
    const matchedLast = reverseString(reverseString(line).match(lastNumber)[1]);

    const tens = parseInt(numberWords[matchedFirst] ?? matchedFirst);
    const ones = parseInt(numberWords[matchedLast] ?? matchedLast);

    sum += tens * 10 + ones;
  }

  console.log("Result:", sum);
})();
