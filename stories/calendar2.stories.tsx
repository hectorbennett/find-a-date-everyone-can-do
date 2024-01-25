// Button.stories.tsx

import Calendar from "@/components/calendar2";
import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";

const meta = {
  component: Calendar,
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    initialFocusedDate: dayjs(),
    getDayProps: (date) => ({
      isSelected: date.date() % 4 === 0,
      isToday: false,
      isInPast: false,
      onClick: () => console.log("click", date),
      selectionCount: 3,
      heat: Math.random(),
    }),
  },
};
