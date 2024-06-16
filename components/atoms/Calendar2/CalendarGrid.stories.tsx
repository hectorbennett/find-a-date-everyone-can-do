/**
 * CalendarGrid.stories.tsx
 */
import type { Meta, StoryObj } from "@storybook/react";
import { CalendarGrid } from "./CalendarGrid";

const meta = {
  component: CalendarGrid,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: 200, display: "flex" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CalendarGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    rows: [
      [
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
      [
        {
          date: {
            year: 2024,
            month: 2,
            day: 5,
          },
          heat: 0,
          isSelected: false,
          isOutsideOfCurrentMonth: false,
        },
        {
          date: {
            year: 2024,
            month: 2,
            day: 6,
          },
          heat: 0,
          isSelected: false,
          isOutsideOfCurrentMonth: false,
        },
        {
          date: {
            year: 2024,
            month: 2,
            day: 7,
          },
          heat: 1,
          isSelected: false,
          isOutsideOfCurrentMonth: true,
        },
        {
          date: {
            year: 2024,
            month: 2,
            day: 8,
          },
          heat: 0,
          isSelected: false,
          isOutsideOfCurrentMonth: false,
        },
        {
          date: {
            year: 2024,
            month: 2,
            day: 9,
          },
          heat: 0,
          isSelected: false,
          isOutsideOfCurrentMonth: false,
        },
        {
          date: {
            year: 2024,
            month: 2,
            day: 10,
          },
          heat: 2,
          isSelected: true,
          isOutsideOfCurrentMonth: false,
        },
        {
          date: {
            year: 2024,
            month: 2,
            day: 11,
          },
          heat: 2,
          isSelected: false,
          isOutsideOfCurrentMonth: false,
        },
      ],
    ],
  },
};
