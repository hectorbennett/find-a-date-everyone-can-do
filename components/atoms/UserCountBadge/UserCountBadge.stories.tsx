/**
 * UserCountBadge.stories.tsx
 */

import type { Meta, StoryObj } from "@storybook/react";
import { UserCountBadge } from "./UserCountBadge";

const meta = {
  component: UserCountBadge,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof UserCountBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    count: 1,
    color: "green",
    inverse: false,
  },
};
