import { useState } from "react";
import { Button, Group, TextInput, Text, Stack } from "@mantine/core";
import EventContext from "@/app/event";
import Card from "./card";

export default function CreateNewUser() {
  const [name, setName] = useState("");
  const event = EventContext.useContainer();

  const existingUser = event.getUserByName(name);

  const handleLogin = () => {
    if (existingUser) {
      event.login(existingUser.uid);
    } else {
      event.createNewUser(name);
    }
  };

  return (
    <Card title="Enter your name" note="Enter the name you want to use.">
      <Stack spacing="sm">
        <TextInput value={name} onChange={(e) => setName(e.target.value)} />
        {existingUser ? (
          <Text>
            User <b>{existingUser.name}</b> already exists, if this is you,
            click continue. Otherwise you may wish to choose another name.
          </Text>
        ) : null}
        <Button disabled={!name} onClick={handleLogin}>
          {existingUser ? (
            <>
              <span>Continue as existing user</span> <b>{existingUser.name}</b>
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </Stack>
    </Card>
  );
}
