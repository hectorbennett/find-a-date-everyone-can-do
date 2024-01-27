/**
 * Swiper.stories.tsx
 */

import { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { Swiper } from "./Swiper";

const meta = {
  component: Swiper,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Swiper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    index: 0,
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
