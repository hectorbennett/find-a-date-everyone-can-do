import { Anchor, Container, Header as MantineHeader } from "@mantine/core";
import Logo from "../Logo";

const HEADER_HEIGHT = 100;

export default function Header() {
  return (
    <MantineHeader height={HEADER_HEIGHT} withBorder={false}>
      <Container
        fluid
        sx={(theme) => ({
          // background: theme.colors.gray[0],
          backgroundColor: theme.colors.purple[8],
          color: theme.colors.green[3],
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        })}
      >
        <Anchor
          href="/"
          color="black"
          underline={false}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {/* <Logo /> */}
          {/* <Title order={6} m={0} sx={{ maxWidth: 80 }}>
              Find a Date Everyone Can Do
            </Title> */}
          <Logo />
        </Anchor>
      </Container>
    </MantineHeader>
  );
}
