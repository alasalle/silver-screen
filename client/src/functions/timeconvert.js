export function time_convert(num) {
  let hours = Math.floor(num / 60);
  let minutes = num % 60;
  return minutes > 1
    ? `${hours} hours and ${minutes} minutes`
    : minutes === 1
    ? `${hours} hours and ${minutes} minute`
    : `${hours} hours`;
}
