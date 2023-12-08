import { createInputStream } from "../utils/file";

type Sample = {
  red: number;
  green: number;
  blue: number;
};

function parseSample(sample: string): Sample {
  const colours = sample.matchAll(/(\d+)\s(\w+)/g);
  const result = { red: 0, green: 0, blue: 0 };

  for (const col of colours) {
    result[col[2]] = parseInt(col[1]);
  }

  return result;
}

function checkIfGameIsPossible(game: string): [boolean, number | undefined] {
  const bagContents: Sample = { red: 12, green: 13, blue: 14 };

  const gameParts = game.match(/^\w+\s(\d+):(.*)$/);
  const gameId = parseInt(gameParts[1]);
  const gameSamples = gameParts[2].split(";").map(parseSample);

  if (
    gameSamples.every(
      (sample) =>
        sample.red <= bagContents.red &&
        sample.green <= bagContents.green &&
        sample.blue <= bagContents.blue
    )
  ) {
    return [true, gameId];
  }

  return [false, undefined];
}

(async function () {
  const rl = createInputStream("day2");

  let sum = 0;

  for await (const line of rl) {
    const [possible, gameId] = checkIfGameIsPossible(line);
    if (possible) {
      sum += gameId;
    }
  }

  console.log("Result:", sum);
})();
