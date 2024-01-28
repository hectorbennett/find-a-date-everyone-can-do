/**
 * StyledCalendar.stories.ts
 */

import type { Meta, StoryObj } from "@storybook/react";
import { StyledCalendar } from "./StyledCalendar";

const meta = {
  component: StyledCalendar,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    a11y: {
      // This option disables all a11y checks on this story
      disable: true,
    },
  },
} satisfies Meta<typeof StyledCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
