/**
 * Layout.stories.tsx
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Layout } from "./Layout";

const meta = {
  component: Layout,
  tags: ["autodocs"],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: "Hello World",
  },
};
