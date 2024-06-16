/**
 * Logo.stories.tsx
 */

import type { Meta, StoryObj } from "@storybook/react";
import { MobileShareButton } from "./MobileShareButton";
import { fn } from "@storybook/test";

const meta = {
  component: MobileShareButton,
  tags: ["autodocs"],
  args: {
    onClickShare: fn(),
  },
} satisfies Meta<typeof MobileShareButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
