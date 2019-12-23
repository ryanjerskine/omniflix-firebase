export function GenerateRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = [];
  count = count > max ? max : count;
  while (arr.length < count) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const r = Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
    if (arr.indexOf(r) === -1) {
      arr.push(r);
    }
  }
  return arr;
}
