import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

export default function Swiper() {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(
    ({ down, movement: [mx], direction, tap }) => {
      if (tap) {
        // ignore tap events
        return;
      }
      if (down) {
        // if the pointer is currently down, keep dragging about
        api.start({ x: mx });
        return;
      }
      // otherwise, decide whether to stay on the same screen (if we haven't dragged far enough)
      // or to move to the next one
      if (mx > 100) {
        console.log("drag right");
        api.start({ x: 100 });
      } else if (mx < -100) {
        console.log("drag left");
        api.start({ x: -100 });
      } else {
        console.log("stay");
        api.start({ x: 0 });
      }
    },
    { filterTaps: true }
  );

  // Bind it to a component
  return (
    <animated.div
      {...bind()}
      style={{ touchAction: "none", userSelect: "none", x, y }}
    >
      Hello world
    </animated.div>
  );
}
