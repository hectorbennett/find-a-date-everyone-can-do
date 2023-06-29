import EventContext from "@/app/event";
import { Button } from "@mantine/core";

export default function LogoutButton() {
  const event = EventContext.useContainer();
  return <Button onClick={() => event.logout()}>Logout</Button>;
}
