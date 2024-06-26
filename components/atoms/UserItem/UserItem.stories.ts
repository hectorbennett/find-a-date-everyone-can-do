/**
 * UserItem.stories.tsx
 */

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { UserItem } from "./UserItem";

const meta = {
  component: UserItem,
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof UserItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    name: "Pablo Crunch",
    isLoggedInUser: false,
    isFocused: false,
  },
};

export const Focused: Story = {
  args: {
    name: "Pablo Crunch",
    isLoggedInUser: false,
    isFocused: true,
  },
};

export const LoggedIn: Story = {
  args: {
    name: "Pablo Crunch",
    isLoggedInUser: true,
    isFocused: true,
  },
};
