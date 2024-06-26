/**
 * Storybook preview.tsx
 */

import React from "react";
import { Preview } from "@storybook/react";
import { MantineProvider } from "../components/MantineProvider";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
};

export default preview;
