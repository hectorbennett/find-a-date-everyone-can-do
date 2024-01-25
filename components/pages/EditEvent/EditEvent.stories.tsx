/**
 * EditEvent.stories.tsx
 */

import type { Meta, StoryObj } from "@storybook/react";
import EventContext, { DEFAULT_EVENT } from "@/app/event";
import { EditEvent } from "./EditEvent";
import AppContext from "@/app/app";

const meta = {
  component: EditEvent,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <AppContext.Provider>
        <EventContext.Provider initialState={{ event: DEFAULT_EVENT }}>
          <Story />
        </EventContext.Provider>
      </AppContext.Provider>
    ),
  ],
} satisfies Meta<typeof EditEvent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {},
};
