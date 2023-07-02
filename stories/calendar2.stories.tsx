import Calendar2 from "../components/calendar2";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Calendar2> = {
  component: Calendar2,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Calendar2>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    dates: {
      "2023-07-01": {
        selected: true,
        user_selection_count: 2,
      },
      "2023-07-02": {
        selected: true,
        user_selection_count: 2,
      },
      "2023-07-03": {
        selected: true,
        user_selection_count: 2,
      },
    },
  },
};
