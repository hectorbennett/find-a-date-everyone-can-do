/**
 * EventNotFound.tsx
 */

import { Button, Stack } from "@mantine/core";
import Link from "next/link";
import { Card } from "../Card";

/** Props for the EventNotFound component */
interface EventNotFoundProps {
  /** Destination when the 'Create a new event' button is clicked. */
  createNewEventUrl: string;
}

/**
 * Event not found component.
 */
export function EventNotFound({ createNewEventUrl }: EventNotFoundProps) {
  return (
    <Card title="Event not found" note="It may have expired.">
      <Stack spacing="sm">
        <Link href={createNewEventUrl} passHref>
          <Button component="a" fullWidth>
            Create a new event
          </Button>
        </Link>
      </Stack>
    </Card>
  );
}
