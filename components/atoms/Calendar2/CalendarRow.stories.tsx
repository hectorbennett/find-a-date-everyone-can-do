/**
 * CalendarDay.stories.tsx
 */
import type { Meta, StoryObj } from "@storybook/react";
import { CalendarRow } from "./CalendarRow";

const meta = {
  component: CalendarRow,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: 100, display: "flex" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CalendarRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    days: [
      {
        date: {
          year: 2024,
          month: 1,
          day: 29,
        },
        heat: 0,
        isSelected: false,
        isOutsideOfCurrentMonth: true,
      },
      {
        date: {
          year: 2024,
          month: 1,
          day: 30,
        },
        heat: 0,
        isSelected: false,
        isOutsideOfCurrentMonth: true,
      },
      {
        date: {
          year: 2024,
          month: 1,
          day: 31,
        },
        heat: 0,
        isSelected: false,
        isOutsideOfCurrentMonth: true,
      },
      {
        date: {
          year: 2024,
          month: 2,
          day: 1,
        },
        heat: 0,
        isSelected: false,
        isOutsideOfCurrentMonth: false,
      },
      {
        date: {
          year: 2024,
          month: 2,
          day: 2,
        },
        heat: 1,
        isSelected: false,
        isOutsideOfCurrentMonth: false,
      },
      {
        date: {
          year: 2024,
          month: 2,
          day: 3,
        },
        heat: 2,
        isSelected: false,
        isOutsideOfCurrentMonth: false,
      },
      {
        date: {
          year: 2024,
          month: 2,
          day: 4,
        },
        heat: 3,
        isSelected: true,
        isOutsideOfCurrentMonth: false,
      },
    ],
  },
};
