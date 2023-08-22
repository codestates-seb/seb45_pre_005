export function dateFormat(date) {
  // const date = new Date(param);

  const splitDate1 = date.split('T');
  const splitDate2 = splitDate1[1].split(':');

  const day = splitDate1[0];
  const hour = splitDate2[0];
  const minute = splitDate2[1];

  const formattedDate = `${day} at ${hour}:${minute}`;
  return formattedDate;
}

export const fullDateFormat = (param) => {
  const date = new Date(param);
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  };
  const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(
    date
  );

  return formattedDate;
};
