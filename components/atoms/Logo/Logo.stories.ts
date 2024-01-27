/**
 * Logo.stories.tsx
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

const meta = {
  component: Logo,
  tags: ["autodocs"],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
