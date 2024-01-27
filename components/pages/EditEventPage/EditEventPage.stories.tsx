/**
 * EditEvent.stories.tsx
 */

import type { Meta, StoryObj } from "@storybook/react";
import EventContext, { DEFAULT_EVENT } from "@/app/event";
import AppContext from "@/app/app";
import { EditEventPage } from "./EditEventPage";

const meta = {
  component: EditEventPage,
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
} satisfies Meta<typeof EditEventPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {},
};
