/**
 * DayHeadings.stories.tsx
 */
import type { Meta, StoryObj } from "@storybook/react";
import { DayHeadings } from "./DayHeadings";

const meta = {
  component: DayHeadings,
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
} satisfies Meta<typeof DayHeadings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
