/**
 * CalendarDay.stories.tsx
 */
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import dayjs from "dayjs";

import { CalendarDay } from "./CalendarDay";

const meta = {
  component: CalendarDay,
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 100 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CalendarDay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    date: dayjs(),
    isOutsideActiveMonth: false,
    isSelected: false,
    isInPast: false,
    isToday: false,
    heat: 0,
    selectionCount: 0,
    isSelectedByFocusedUser: false,
  },
};

export const Selected: Story = {
  args: {
    date: dayjs(),
    isOutsideActiveMonth: false,
    isSelected: true,
    isInPast: false,
    isToday: false,
    heat: 0,
    selectionCount: 0,
    isSelectedByFocusedUser: false,
  },
};

export const Today: Story = {
  args: {
    date: dayjs(),
    isOutsideActiveMonth: false,
    isSelected: false,
    isInPast: false,
    isToday: true,
    heat: 0,
    selectionCount: 0,
    isSelectedByFocusedUser: false,
  },
};

export const FullHeat: Story = {
  args: {
    date: dayjs(),
    isOutsideActiveMonth: false,
    isSelected: false,
    isInPast: false,
    isToday: false,
    heat: 1,
    selectionCount: 0,
    isSelectedByFocusedUser: false,
  },
};

export const HalfHeat: Story = {
  args: {
    date: dayjs(),
    isOutsideActiveMonth: false,
    isSelected: false,
    isInPast: false,
    isToday: false,
    heat: 0.5,
    selectionCount: 0,
    isSelectedByFocusedUser: false,
  },
};

export const SelectedByFocusedUser: Story = {
  args: {
    date: dayjs(),
    isOutsideActiveMonth: false,
    isSelected: false,
    isInPast: false,
    isToday: false,
    heat: 0.5,
    selectionCount: 0,
    isSelectedByFocusedUser: true,
  },
};

export const IsInPast: Story = {
  args: {
    date: dayjs(),
    isOutsideActiveMonth: false,
    isSelected: false,
    isInPast: true,
    isToday: false,
    heat: 0.5,
    selectionCount: 0,
    isSelectedByFocusedUser: false,
  },
};
