export const buildForecastSection = ({ list }) => {
  let prevItemDay = 0;
  let count = 0;

  const grouppedList = Object.groupBy(list, ({ dt }) => {
    const date = new Date(dt * 1000);
    const day = date.getDay();

    if (day !== prevItemDay) {
      count++;
    }

    prevItemDay = day;
    return count;
  });
  console.log(grouppedList);
};
