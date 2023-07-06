import { TouchEvent, useState } from "react";
import dayjs from "dayjs";
import chroma from "chroma-js";

export const getDateString = (date: Date) => dayjs(date).format("YYYY-MM-DD");

export const getHeatColour = (n: number) => {
  // if (n === 1) {
  //   return "#fab005";
  // }
  const f = chroma.scale([
    "#EBECFD",
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


interface SwipeInput {
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
}

interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

export const useSwipe = (input: SwipeInput): SwipeOutput => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(0); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      input.onSwipedLeft();
    }
    if (isRightSwipe) {
      input.onSwipedRight();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};
