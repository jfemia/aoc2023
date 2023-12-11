import { createInputStream } from "../utils/file";

function isNumber(value: string) {
  return value[0] >= "0" && value[0] <= "9";
}

(async function () {
  const rl = createInputStream("day3");

  let part1Sum = 0;

  for await (const line of rl) {
    const parts = Array.from(line.matchAll(/\d+|[^\.]/g));
  }

  console.log("Part 1 Result:", part1Sum);
})();
