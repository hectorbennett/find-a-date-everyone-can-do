import type { Meta, StoryObj } from "@storybook/react";
import Calendar from "../components/calendar2";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Calendar> = {
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    getDayProps: (date) => ({
      isSelected: Math.random() < 0.5,
      isToday: false,
      isInPast: false,
      onClick: () => console.log("click", date),
      selectionCount: 3,
      heat: Math.random(),
    }),
  },
};
