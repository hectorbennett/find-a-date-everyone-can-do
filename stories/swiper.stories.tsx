import type { Meta, StoryObj } from "@storybook/react";
import Swiper from "../components/swiper";
import { ReactNode } from "react";
import { Box } from "@mantine/core";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Swiper> = {
  component: Swiper,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Swiper>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    getContent: (index: number) => <SwiperInner>Box {index}</SwiperInner>,
  },
};

function SwiperInner({ children }: { children: ReactNode }) {
  return (
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
      {children}
    </Box>
  );
}
