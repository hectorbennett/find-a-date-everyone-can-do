/**
 * CalendarGrid.stories.tsx
 */
import type { Meta, StoryObj } from "@storybook/react";
import { CalendarBody } from "./CalendarBody";
import { fn } from "@storybook/test";

const meta = {
  component: CalendarBody,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: 500, display: "flex", flexDirection: "column" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onClickDay: fn(),
  },
} satisfies Meta<typeof CalendarBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    month: { year: 2024, month: 2 },
    getDayProps: ({ day, month, year }) => {
      return {
        heat: (day % 4) as 0 | 1 | 2 | 3,
        isSelected: day % 4 === 1,
      };
    },
  },
};
