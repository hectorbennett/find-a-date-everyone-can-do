/**
 * Card.stories.tsx
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta = {
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Title",
    note: "note",
    children: "Children",
  },
};
