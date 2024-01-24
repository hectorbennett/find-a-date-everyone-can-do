import { TouchEvent, useEffect, useMemo, useState } from "react";
import type { Dayjs } from "dayjs";
import chroma from "chroma-js";
import EventContext from "./event";

export const getDateString = (date: Dayjs) => date.format("YYYY-MM-DD");

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
    let targetTouches = e.targetTouches[0];
    if (targetTouches) {
      setTouchStart(targetTouches.clientX);
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    let targetTouches = e.targetTouches[0];
    if (targetTouches) {
      setTouchEnd(targetTouches.clientX);
    }
  };

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

export const useNavigatorShare = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [canShare, setCanShare] = useState(false);
  const [shareData, setShareData] = useState({});
  const event = EventContext.useContainer();

  useEffect(() => {
    setShareData({
      title: event.shareTitle,
      text: "Enter your availability to find a date everyone can do!",
      url: window.location.href,
    });
  }, [event.shareTitle]);

  useEffect(() => {
    if (!navigator.canShare) {
      setCanShare(false);
    } else if (navigator.canShare(shareData)) {
      setCanShare(true);
    } else {
      setCanShare(false);
    }
    setIsLoading(false);
  }, [shareData]);

  return {
    isLoading,
    canShare,
    shareData,
  };
};
