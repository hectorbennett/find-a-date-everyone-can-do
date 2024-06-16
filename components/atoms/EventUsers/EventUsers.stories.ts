/**
 * EventUsers.stories.tsx
 */

import type { Meta, StoryObj } from "@storybook/react";
import { EventUsers } from "./EventUsers";
import { fn } from "@storybook/test";

const meta = {
  component: EventUsers,
  tags: ["autodocs"],
  args: {
    onFocusUser: fn(),
  },
} satisfies Meta<typeof EventUsers>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    users: [
      { name: "Hector Bennet", id: "1" },
      { name: "Pablo Crunch", id: "2" },
    ],
    loggedInUserId: "1",
    focusedUserId: null,
  },
};

export const FocusedUser: Story = {
  args: {
    users: [
      { name: "Hector Bennet", id: "1" },
      { name: "Pablo Crunch", id: "2" },
    ],
    loggedInUserId: "1",
    focusedUserId: "2",
  },
};
