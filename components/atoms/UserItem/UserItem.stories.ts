/**
 * UserItem.stories.tsx
 */

import type { Meta, StoryObj } from "@storybook/react";
import { UserItem } from "./UserItem";

const meta = {
  component: UserItem,
  tags: ["autodocs"],
} satisfies Meta<typeof UserItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    name: "Pablo Crunch",
    isLoggedInUser: false,
  },
};
