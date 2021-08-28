export default function isoDateConverter(dateToFormat, setDate) {
  const isoDate = new Date(dateToFormat);
  const year = isoDate.getFullYear();
  const monthVar = 1;
  const dtCondition = 10;
  let month = isoDate.getMonth() + monthVar;
  let dt = isoDate.getDate();
  if (dt < dtCondition) {
    dt = `0${dt}`;
  }
  if (month < dtCondition) {
    month = `0${month}`;
  }
  const date = `${year}-${month}-${dt}`;
  if (setDate) return setDate(date);
  return date;
}
