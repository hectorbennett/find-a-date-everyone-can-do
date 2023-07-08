import { ReactNode, useEffect, useState } from "react";
import { Box } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

interface SwiperProps {
  index: number;
  setIndex: (index: number) => void;
  getContent: (index: number) => ReactNode;
}

export default function Swiper({ index, setIndex, getContent }: SwiperProps) {
  // const [index, setIndex] = useState(0);
  const { ref, width } = useElementSize();
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(
    ({ down, movement: [mx], tap }) => {
      if (tap) {
        // ignore tap events
        return;
      }
      if (down) {
        // if the pointer is currently down, keep dragging about
        api.start({ x: mx + -index * width });
        return;
      }

      // otherwise, decide whether to stay on the same item (if we haven't dragged far enough)
      // or to move to the next one
      if (mx > width / 4) {
        dragRight();
      } else if (mx < -width / 4) {
        dragLeft();
      } else {
        // stay
        api.start({ x: -index * width });
      }
    },
    { filterTaps: true }
  );

  const dragLeft = () => {
    setIndex(index + 1);
  };

  const dragRight = () => {
    setIndex(index - 1);
  };

  useEffect(() => {
    api.start({ x: -index * width, immediate: true });
  }, [width]);

  useEffect(() => {
    api.start({ x: -index * width });
  }, [index]);

  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <animated.div
        {...bind()}
        style={{
          display: "flex",
          touchAction: "none",
          userSelect: "none",
          x,
          y,
        }}
      >
        <Box
          style={{
            transform: `translateX(${width * (index - 1)}px)`,
          }}
          sx={{
            display: "flex",
          }}
        >
          {[index - 1, index, index + 1].map((i, j) => (
            <Box style={{ width }} key={j}>
              {getContent(i)}
            </Box>
          ))}
        </Box>
      </animated.div>
    </Box>
  );
}
