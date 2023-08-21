export function dateFormat(date) {
  const param = new Date(date);
  const now = new Date();
  // const nowYear = now.getFullYear();
  // const nowMonth = now.getMonth() + 1;
  // const nowDay = now.getDate();

  console.log(now);
  console.log(param);
  const diff = now.getTime() - param.getTime();

  const diffDate = diff / (24 * 60 * 60 * 1000);
  const diffHour = diff / (60 * 60 * 1000);
  const diffMin = diff / (60 * 1000);

  console.log(diffDate);
  console.log(diffHour);
  console.log(diffMin);
}
