/**
 * Logo.stories.tsx
 */

import type { Meta, StoryObj } from "@storybook/react";
import { ShareButton } from "./ShareButton";

const meta = {
  component: ShareButton,
  tags: ["autodocs"],
} satisfies Meta<typeof ShareButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
