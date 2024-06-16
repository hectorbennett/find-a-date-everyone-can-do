/**
 * CalendarDay.stories.tsx
 */
import type { Meta, StoryObj } from "@storybook/react";
import { CalendarDay } from "./CalendarDay";
import { fn } from "@storybook/test";

const meta = {
  component: CalendarDay,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 100, height: 100, display: "flex" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof CalendarDay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    dayOfMonth: 1,
    heat: 0,
    isSelected: false,
    isOutsideOfCurrentMonth: false,
  },
};

export const OutsideOfMonth: Story = {
  args: {
    dayOfMonth: 1,
    heat: 0,
    isSelected: false,
    isOutsideOfCurrentMonth: true,
  },
};

export const Heat1: Story = {
  args: {
    dayOfMonth: 1,
    heat: 1,
    isSelected: false,
    isOutsideOfCurrentMonth: false,
  },
};

export const Heat2: Story = {
  args: {
    dayOfMonth: 1,
    heat: 2,
    isSelected: false,
    isOutsideOfCurrentMonth: false,
  },
};

export const Heat3: Story = {
  args: {
    dayOfMonth: 1,
    heat: 3,
    isSelected: false,
    isOutsideOfCurrentMonth: false,
  },
};

export const Selected: Story = {
  args: {
    dayOfMonth: 31,
    heat: 3,
    isSelected: true,
    isOutsideOfCurrentMonth: false,
  },
};
