import EventContext from "@/app/event";
import { Box, Button } from "@mantine/core";
import { Card } from "../atoms";

/**
 *
 */
function LogoutButton() {
  const event = EventContext.useContainer();
  return <Button onClick={() => event.logout()}>Logout</Button>;
}

/**
 *
 */
export default function Logout() {
  return (
    <Card>
      <Box p="xs">
        <LogoutButton />
      </Box>
    </Card>
  );
}
