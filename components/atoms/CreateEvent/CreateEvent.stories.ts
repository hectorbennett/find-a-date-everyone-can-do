/**
 * CreateEventForm.stories.ts
 */

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { CreateEvent } from "./CreateEvent";

const meta = {
  component: CreateEvent,
  tags: ["autodocs"],
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof CreateEvent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    isSubmittingForm: false,
  },
};
