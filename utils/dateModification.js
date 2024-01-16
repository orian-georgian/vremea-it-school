const weekDays = [
  "Duminică",
  "Luni",
  "Marți",
  "Miercuri",
  "Joi",
  "Vineri",
  "Sâmbătă",
];

const months = [
  "Ianuarie",
  "Februarie",
  "Martie",
  "Aprilie",
  "Mai",
  "Iunie",
  "August",
  "Septembrie",
  "Octombrie",
  "Noiembrie",
  "Decembrie",
];

export const getDayName = (value) => {
  const date = new Date(value * 1000);
  const dayIndex = date.getDay();

  return weekDays[dayIndex];
};

export const formatDate = (value) => {
  const date = new Date(value * 1000);
  const dayName = getDayName(value);
  const monthIndex = date.getMonth();
  const dayNumber = date.getDate();
  const monthName = months[monthIndex];

  return `${dayName}, ${dayNumber} ${monthName}`;
};

export const getHour = (value) => {
  const date = new Date(value * 1000);
  const hour = date.getHours();

  return `${hour > 10 ? hour : "0" + hour}:00`;
};
