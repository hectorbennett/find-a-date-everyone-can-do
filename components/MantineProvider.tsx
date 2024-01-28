/**
 * MantineProvider.tsx
 */

import { MantineProvider as MantineProviderOrig } from "@mantine/core";
import { belanosima, open_sans } from "@/app/fonts";
import { ReactNode } from "react";

interface MantineProvider {
  children: ReactNode;
}

/**
 * MantineProvider with applied theme changes.
 */
export const MantineProvider = ({ children }: MantineProvider) => {
  return (
    <MantineProviderOrig
      withGlobalStyles
      withNormalizeCSS
      theme={{
        globalStyles: (theme) => ({
          "input::-webkit-calendar-picker-indicator": {
            display: "none !important",
          },
          "html, body": {
            overflowX: "hidden",
            width: "auto!important",
          },
          primaryColor: "brand",
        }),
        fontFamily: open_sans.style.fontFamily,
        colorScheme: "light",
        headings: {
          fontFamily: belanosima.style.fontFamily,
          fontWeight: 400,
        },
        primaryColor: "teal",
        primaryShade: 9,
      }}
    >
      {children}
    </MantineProviderOrig>
  );
};
