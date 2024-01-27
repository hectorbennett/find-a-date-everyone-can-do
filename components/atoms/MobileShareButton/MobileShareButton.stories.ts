/**
 * Logo.stories.tsx
 */

import type { Meta, StoryObj } from "@storybook/react";
import { MobileShareButton } from "./MobileShareButton";

const meta = {
  component: MobileShareButton,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileShareButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
