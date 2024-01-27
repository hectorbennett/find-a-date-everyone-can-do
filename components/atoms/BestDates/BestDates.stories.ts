/**
 * BestDates.stories.tsx
 */

import type { Meta, StoryObj } from "@storybook/react";
import { BestDates } from "./BestDates";
import dayjs from "dayjs";

const meta = {
  component: BestDates,
  tags: ["autodocs"],
} satisfies Meta<typeof BestDates>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    userCount: 5,
    dateCounts: [
      { date: dayjs("2023-01-02", "YYYY-MM-DD"), count: 5 },
      { date: dayjs("2023-01-02"), count: 4 },
      { date: dayjs("2023-01-03"), count: 5 },
      { date: dayjs("2023-01-04"), count: 1 },
      { date: dayjs("2023-01-05"), count: 0 },
    ],
  },
};

export const FewDates: Story = {
  args: {
    userCount: 5,
    dateCounts: [
      { date: dayjs("2023-01-02", "YYYY-MM-DD"), count: 4 },
      { date: dayjs("2023-01-02"), count: 4 },
    ],
  },
};

export const NoDates: Story = {
  args: {
    userCount: 5,
    dateCounts: [],
  },
};

export const OnlyOneUser: Story = {
  args: {
    userCount: 1,
    dateCounts: [],
  },
};
