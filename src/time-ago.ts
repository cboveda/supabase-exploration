export function timeAgo(time: string) {
  const then = new Date(time).getTime();
  const now = Date.now();
  const diff = Math.abs(then - now);

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let value = "";
  let unit = "";
  if (diff < minute) {
    value = (diff / second).toFixed();
    unit = "second";
  } else if (diff < hour) {
    value = (diff / minute).toFixed();
    unit = "minute";
  } else if (diff < day) {
    value = (diff / hour).toFixed();
    unit = "hour";
  } else {
    value = (diff / day).toFixed();
    unit = "day";
  }

  return `${value} ${unit}${value === "1" ? "" : "s"}`;
}
