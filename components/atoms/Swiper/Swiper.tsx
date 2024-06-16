/**
 * Swiper.tsx
 */

import { ReactNode, useEffect, useRef } from "react";
import { Box, Skeleton } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

interface SwiperProps {
  index: number;
  onSetIndex: (index: number) => void;
  getContent: (index: number) => ReactNode;
}

/**
 *
 * @param root0
 * @param root0.index
 * @param root0.setIndex
 * @param root0.getContent
 */
export function Swiper({ index, onSetIndex, getContent }: SwiperProps) {
  const { ref, width } = useElementSize();
  const prevWidth = useRef(0);
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const roundedWidth = Math.ceil(width);

  const bind = useDrag(
    ({ down, movement: [mx], tap, velocity: [vx] }) => {
      if (tap) {
        // ignore tap events
        return;
      }
      if (down) {
        // if the pointer is currently down, keep dragging about
        api.start({ x: mx + -index * roundedWidth });
        return;
      }
      if (Math.abs(mx) < roundedWidth / 2 && vx < 0.2) {
        // if we've only moved a little bit and velocity is low, cancel and stay on the same
        // item
        api.start({ x: -index * roundedWidth });
        return;
      }

      // otherwise, decide whether to move left or right
      if (mx > 20) {
        dragRight();
      } else if (mx < -20) {
        dragLeft();
      } else {
        api.start({ x: -index * roundedWidth });
      }
    },
    { filterTaps: true, axis: "x" }
  );

  const dragLeft = () => {
    onSetIndex(index + 1);
  };

  const dragRight = () => {
    onSetIndex(index - 1);
  };

  useEffect(() => {
    if (roundedWidth !== prevWidth.current) {
      /* if we've resized the window, do not animate */
      api.start({ x: -index * roundedWidth, immediate: true });
      prevWidth.current = roundedWidth;
    } else {
      api.start({ x: -index * roundedWidth });
    }
  }, [api, index, roundedWidth]);

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
        {!width ? (
          <Placeholder />
        ) : (
          <Box
            style={{
              transform: `translateX(${roundedWidth * (index - 1)}px)`,
            }}
            sx={{
              display: "flex",
            }}
          >
            {[index - 1, index, index + 1].map((i, j) => (
              <Box
                style={{
                  width: roundedWidth,
                  height: i !== index ? 0 : undefined,
                }}
                key={j}
              >
                {getContent(i)}
              </Box>
            ))}
          </Box>
        )}
      </animated.div>
    </Box>
  );
}

/**
 *
 */
function Placeholder() {
  return (
    <Box
      sx={{
        width: "100%",
        "&:after": {
          content: '""',
          display: "block",
          paddingBottom: "100%",
        },
      }}
    >
      <Skeleton width="100%" height="100%" />
    </Box>
  );
}
