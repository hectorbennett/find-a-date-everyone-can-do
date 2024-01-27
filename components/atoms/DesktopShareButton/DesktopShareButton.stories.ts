/**
 * DesktopShareButton.stories.tsx
 */

import type { Meta, StoryObj } from "@storybook/react";
import { DesktopShareButton } from "./DesktopShareButton";

const meta = {
  component: DesktopShareButton,
  tags: ["autodocs"],
} satisfies Meta<typeof DesktopShareButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    url: "This is the url :)",
  },
};
