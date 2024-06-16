/**
 * The day headings
 */

import { Box, Text } from "@mantine/core";
import dayjs from "dayjs";
import styles from "./DayHeadings.module.scss";

/**
 * The day headings above each column of the calendar.
 * @returns A react component.
 */
export function DayHeadings() {
  return (
    <Box className={styles.dayHeadings}>
      {Array.from(Array(7).keys()).map((i) => (
        <Box key={i} className={styles.dayHeading} pb="xs">
          <Text size="xs">
            {dayjs()
              .day(i + 1)
              .format("ddd")}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
