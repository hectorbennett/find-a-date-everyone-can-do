import dayjs from "dayjs";
import type { Meta, StoryObj } from "@storybook/react";
import { CalendarTable } from "../components/calendar2";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CalendarTable> = {
  component: CalendarTable,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CalendarTable>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    date: dayjs(),
  },
};
