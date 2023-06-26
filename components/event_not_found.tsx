import { Button, Stack } from "@mantine/core";
import Card from "./card";
import Link from "next/link";

export default function EventNotFound() {
  return (
    <Card title="Event not found" note="It may have expired.">
      <Stack spacing="sm">
        <Link href="/" passHref>
          <Button component="a" fullWidth>
            Create a new event
          </Button>
        </Link>
      </Stack>
    </Card>
  );
}
