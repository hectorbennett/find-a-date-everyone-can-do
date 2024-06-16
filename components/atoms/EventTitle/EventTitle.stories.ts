/**
 * EventTitle.stories.ts
 */

import type { Meta, StoryObj } from "@storybook/react";
import { EventTitle } from "./EventTitle";
import dayjs from "dayjs";
import { fn } from "@storybook/test";

const meta = {
  component: EventTitle,
  tags: ["autodocs"],
  args: {
    onClickMobileShare: fn(),
  },
} satisfies Meta<typeof EventTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutMobileShareButton: Story = {
  args: {
    name: "A test event",
    creationDate: dayjs("2023-01-01"),
    showMobileShareButton: false,
  },
};

export const WithMobileShareButton: Story = {
  args: {
    name: "A test event",
    creationDate: dayjs("2023-01-01"),
    showMobileShareButton: true,
  },
};
