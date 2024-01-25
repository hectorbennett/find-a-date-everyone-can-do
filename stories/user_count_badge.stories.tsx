import type { Meta, StoryObj } from "@storybook/react";
import UserCountBadge from "../components/user_count_badge";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta  = {
  component: UserCountBadge,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof UserCountBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    count: 1,
    color: "green",
    inverse: false,
  },
};
