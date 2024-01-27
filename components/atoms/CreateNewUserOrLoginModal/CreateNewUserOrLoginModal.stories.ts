/**
 * CreateNewUserOrLoginModal.stories.tsx
 */

import type { Meta, StoryObj } from "@storybook/react";
import { CreateNewUserOrLoginModal } from "./CreateNewUserOrLoginModal";

const meta = {
  component: CreateNewUserOrLoginModal,
  tags: ["autodocs"],
} satisfies Meta<typeof CreateNewUserOrLoginModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    users: [
      { name: "Hector", id: "1" },
      { name: "Pablo Crunch", id: "2" },
    ],
    isOpen: true,
  },
};
