import dayjs from "dayjs";
import chroma from "chroma-js";

export const getDateString = (date: Date) => dayjs(date).format("YYYY-MM-DD");

export const getHeatColour = (n: number) => {
  if (n === 1) {
    return "#fab005";
  }
  const f = chroma.scale([
    "#dbdbff",
    "#DCF5BC",
    "#CAE9A3",
    "#B1DA7C",
    "#A0D75B",
    "#89D02E",
    "#76C710",
  ]);
  return f(n).toString();
};
