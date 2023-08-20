import { Title } from "@mantine/core";

export default function Logo() {
  return (
    <Title
      weight={600}
      size={28}
      sx={(theme) => ({ lineHeight: "1.6rem", color: theme.colors.green[3] })}
    >
      Find a Date Everyone Can Do.com
    </Title>
  );
}
