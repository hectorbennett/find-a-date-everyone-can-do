/**
 * CalendarGrid.stories.tsx
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Calendar2 } from "./Calendar2";

const meta = {
  component: Calendar2,
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    month: {
      year: 2024,
      month: 2,
    },
    getDayProps: ({ day, month, year }) => {
      return {
        heat: (day % 4) as 0 | 1 | 2 | 3,
        isSelected: day % 4 === 1,
      };
    },
  },
};
