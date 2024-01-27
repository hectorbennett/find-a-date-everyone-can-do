/**
 * EventNotFound.stories.tsx
 */
import type { Meta, StoryObj } from "@storybook/react";
import { EventNotFound } from "./EventNotFound";

const meta = {
  component: EventNotFound,
  tags: ["autodocs"],
} satisfies Meta<typeof EventNotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    createNewEventUrl: "#",
  },
};
