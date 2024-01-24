import type { Meta, StoryObj } from "@storybook/react";
import Swiper from "./Swiper";
import { useState } from "react";
import { Box } from "@mantine/core";

const meta = {
  component: Swiper,
};

export default meta;

export const Primary = {
  render: () => <SwiperExample />,
};

const SwiperExample = () => {
  const [index, setIndex] = useState(0);

  return (
    <Swiper
      index={index}
      setIndex={setIndex}
      getContent={(i) => (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: 100,
            alignItems: "center",
            justifyContent: "center",
            background: "pink",
          }}
        >
          {index}
        </Box>
      )}
    />
  );
};
