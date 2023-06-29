import {
  ContainerProps,
  Container as MantineContainer,
  em,
  getBreakpointValue,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function Container(props: ContainerProps) {
  const theme = useMantineTheme();
  const breakpoint = em(getBreakpointValue(theme.breakpoints.xs));
  const largeScreen = useMediaQuery(`(min-width: ${breakpoint})`);
  return (
    <MantineContainer
      p={largeScreen ? "xl" : 5}
      m={largeScreen ? undefined : 0}
      {...props}
    />
  );
}
