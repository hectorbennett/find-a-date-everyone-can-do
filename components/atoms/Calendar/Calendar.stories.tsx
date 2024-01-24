/**
 * Calendar.stories.tsx
 */

import type { Meta, StoryObj } from '@storybook/react';
import Calendar from './Calendar';
import dayjs from 'dayjs';

const meta = {
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    initialFocusedDate: dayjs(),
    getDayProps: (date) => ({
      isSelected: Math.random() < 0.5,
      isToday: false,
      isInPast: false,
      onClick: () => console.log("click", date),
      selectionCount: 3,
      heat: Math.random(),
    }),
  },
};