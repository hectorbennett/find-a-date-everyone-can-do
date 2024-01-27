/**
 * RecentEvents.stories.tsx
 */

import type { Meta, StoryObj } from "@storybook/react";
import { RecentEvents } from "./RecentEvents";
import dayjs from "dayjs";

const meta = {
  component: RecentEvents,
  tags: ["autodocs"],
} satisfies Meta<typeof RecentEvents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    events: [
      {
        eventId: "1",
        eventName: "Test Event 1",
        userId: "abc",
        lastLoginDate: dayjs("2024-01-01"),
      },
      {
        eventId: "2",
        eventName: "Test Event 2",
        userId: "def",
        lastLoginDate: dayjs("2023-01-01"),
      },
    ],
  },
};
