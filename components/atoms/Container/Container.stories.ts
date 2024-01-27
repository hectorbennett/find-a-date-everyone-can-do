/**
 * Container.stories.ts
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";

const meta = {
  component: Container,
  tags: ["autodocs"],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "This is a container",
  },
};
