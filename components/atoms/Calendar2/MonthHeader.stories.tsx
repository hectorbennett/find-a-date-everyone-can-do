/**
 * MonthHeader.stories.tsx
 */
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { MonthHeader } from "./MonthHeader";

const meta = {
  component: MonthHeader,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          height: 100,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    onClickNext: fn(),
    onClickPrevious: fn(),
  },
} satisfies Meta<typeof MonthHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    year: 3001,
    month: 10,
  },
};
