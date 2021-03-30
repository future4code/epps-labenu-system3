export const strDateToDate = (dateString: string) => {
  const arrDateString = dateString.split("/");
  const strDate =
    arrDateString[2] + "-" + arrDateString[1] + "-" + arrDateString[0];
  return new Date(strDate);
};
