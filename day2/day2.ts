import { createInputStream } from "../utils/file";

type Sample = {
  red: number;
  green: number;
  blue: number;
};

function emptySample(): Sample {
  return { red: 0, green: 0, blue: 0 };
}

function parseSample(sample: string): Sample {
  const colours = sample.matchAll(/(\d+)\s(\w+)/g);
  const result = emptySample();

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

function calculateGameMaxPower(game: string): number {
  const maxSample = game
    .match(/^.*:(.*)$/)[1]
    .split(";")
    .map(parseSample)
    .reduce((result, sample) => {
      result.red = Math.max(result.red, sample.red);
      result.green = Math.max(result.green, sample.green);
      result.blue = Math.max(result.blue, sample.blue);
      return result;
    }, emptySample());

  return Object.values(maxSample).reduce((acc, val) => (acc *= val), 1);
}

(async function () {
  const rl = createInputStream("day2");

  let part1Sum = 0;
  let part2Sum = 0;

  for await (const line of rl) {
    const [possible, gameId] = checkIfGameIsPossible(line);
    if (possible) {
      part1Sum += gameId;
    }

    part2Sum += calculateGameMaxPower(line);
  }

  console.log("Part 1 Result:", part1Sum);
  console.log("Part 2 Result:", part2Sum);
})();
