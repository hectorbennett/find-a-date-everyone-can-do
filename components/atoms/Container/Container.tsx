/**
 * Container.tsx
 */

import {
  ContainerProps as MantineContainerProps,
  Container as MantineContainer,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    padding: 0,
    margin: 0,

    // Simplify media query writing with theme functions
    [theme.fn.largerThan("xs")]: {
      padding: theme.spacing.xl,
      margin: "auto",
    },
  },
}));

/**
 * Container component.
 */
export function Container(props: MantineContainerProps) {
  const { classes } = useStyles();
  return (
    <MantineContainer
      className={"p" in props || "m" in props ? undefined : classes.container}
      {...props}
    />
  );
}
