/**
 * CreateEventForm.stories.ts
 */

import type { Meta, StoryObj } from "@storybook/react";
import { CreateEvent } from "./CreateEvent";

const meta = {
  component: CreateEvent,
  tags: ["autodocs"],
} satisfies Meta<typeof CreateEvent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    isSubmittingForm: false,
  },
};
