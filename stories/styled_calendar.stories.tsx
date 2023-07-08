// import { Dayjs } from "dayjs";
// import { getDateString } from "../app/utils";
import StyledCalendar from "../components/styled_calendar";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StyledCalendar> = {
  component: StyledCalendar,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof StyledCalendar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    // getDayProps: (date: Dayjs) => ({
    //   selected: ["2023-07-01", "2023-07-02", "2023-07-03"].includes(
    //     getDateString(date)
    //   ),
    //   heat: Math.random(),
    // }),
  },
};
