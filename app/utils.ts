import dayjs from "dayjs";

export const getDateString = (date: Date) => dayjs(date).format("YYYY-MM-DD");
