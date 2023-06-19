import { Button, TextInput, Title } from "@mantine/core";

export default function Index() {
  return (
    <div>
      <Title order={1}>Find a date everyone can do</Title>

      <TextInput
        placeholder="Enter a name for your event here"
        label="What is your event?"
        variant="filled"
      />

      <Button radius="xs" size="lg">
        Find a date!
      </Button>
    </div>
  );
}
