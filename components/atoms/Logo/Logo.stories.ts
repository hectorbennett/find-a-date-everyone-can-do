import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

const meta = {
  component: Logo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};
