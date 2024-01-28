/**
 * EventUsers.stories.tsx
 */

import type { Meta, StoryObj } from "@storybook/react";
import { EventUsers } from "./EventUsers";

const meta = {
  component: EventUsers,
  tags: ["autodocs"],
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
