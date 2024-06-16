/**
 * Month header
 */

import { ActionIcon, Box, Title } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import styles from "./MonthHeader.module.scss";
import dayjs from "dayjs";

/**
 * Props for the month header.
 */
interface MonthHeaderProps {
  /** Month (1-12) */
  month: number;
  /** Year */
  year: number;
  /** Callback when previous month button clicked. */
  onClickPrevious: () => void;
  /** Callback when next month button clicked. */
  onClickNext: () => void;
}

/**
 * A month header, including navigation buttons.
 * @param props - The component props.
 * @param props.month - The month.
 * @param props.year - The year.
 * @param props.onClickPrevious - Callback when previous month button clicked.
 * @param props.onClickNext - Callback when next month button clicked.
 * @returns A MonthHeader react component.
 */
export function MonthHeader({
  month,
  year,
  onClickPrevious,
  onClickNext,
}: MonthHeaderProps) {
  return (
    <Box className={styles.monthHeader} p="xs">
      <Title order={4} className={styles.title}>
        {dayjs(`${year}-${month}-01`).format("MMMM YYYY")}
      </Title>
      <ActionIcon
        size="xl"
        onClick={onClickPrevious}
        aria-label="Previous month"
      >
        <IconChevronLeft size="1rem" />
      </ActionIcon>
      <ActionIcon size="xl" onClick={onClickNext} aria-label="Next month">
        <IconChevronRight size="1rem" />
      </ActionIcon>
    </Box>
  );
}
