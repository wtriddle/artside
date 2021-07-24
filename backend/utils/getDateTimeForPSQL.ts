export const getDateTime = (input: string | Date) => {
  /* Converts a date string into seperate date + time variables
      in a format accepted by postgreSQL  
    */
  const d: Date = new Date(input);
  let date = d.toLocaleDateString().split("/");
  date[0] = parseInt(date[0]) < 10 ? "0" + date[0] : date[0];
  date[1] = parseInt(date[1]) < 10 ? "0" + date[1] : date[1];
  let month = date[1];
  date[1] = date[0];
  date[0] = month;
  return {
    date: date.reverse().join("-"),
    time: d.toTimeString().split(" ")[0],
  };
};
