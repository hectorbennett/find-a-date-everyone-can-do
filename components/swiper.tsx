import { ReactNode, useEffect, useRef } from "react";
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
  const { ref, width } = useElementSize();
  const prevWidth = useRef(0);
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(
    ({ down, movement: [mx], tap, velocity: [vx] }) => {
      if (tap) {
        // ignore tap events
        return;
      }
      if (down) {
        // if the pointer is currently down, keep dragging about
        api.start({ x: mx + -index * width });
        return;
      }
      if (Math.abs(mx) < width / 2 && vx < 0.2) {
        // if we've only moved a little bit and velocity is low, cancel and stay on the same
        // item
        api.start({ x: -index * width });
        return;
      }

      // otherwise, decide whether to move left or right
      if (mx > 20) {
        dragRight();
      } else if (mx < -20) {
        dragLeft();
      } else {
        api.start({ x: -index * width });
      }
    },
    { filterTaps: true, axis: "x" }
  );

  const dragLeft = () => {
    setIndex(index + 1);
  };

  const dragRight = () => {
    setIndex(index - 1);
  };

  useEffect(() => {
    if (width !== prevWidth.current) {
      /* if we've resized the window, do not animate */
      api.start({ x: -index * width, immediate: true });
      prevWidth.current = width;
    } else {
      api.start({ x: -index * width });
    }
  }, [api, index, width]);

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
          touchAction: "pan-y",
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
            <Box style={{ width, height: i !== index ? 0 : undefined }} key={j}>
              {getContent(i)}
            </Box>
          ))}
        </Box>
      </animated.div>
    </Box>
  );
}
