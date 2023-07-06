import { Button, TextInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import EventContext from "@/app/event";
import Card from "../card";

export default function CreateNewUser() {
  return (
    <Card title="Enter your name" note="Enter the name you want to use.">
      <CreateNewUserForm />
    </Card>
  );
}

interface FormValues {
  userName: string;
}

function CreateNewUserForm() {
  const event = EventContext.useContainer();
  const form = useForm<FormValues>({
    initialValues: {
      userName: "",
    },

    validate: {
      userName: (value) => {
        if (!value.length) {
          return "Please enter a name";
        }
        if (value.length <= 2) {
          return "Please enter a longer name";
        }
        if (value.length > 100) {
          return "Please enter a shorter name";
        }
        return null;
      },
    },
  });

  const existingUser = event.getUserByName(form.values.userName);

  const handleSubmit = async (values: FormValues) => {
    if (existingUser) {
      event.login(existingUser.id);
    } else {
      event.createNewUser(values.userName);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="sm" p="xs">
        <TextInput
          list="users"
          size="md"
          autoFocus
          placeholder="E.g. Bob Smith"
          {...form.getInputProps("userName")}
        />
        <datalist id="users">
          {Object.values(event.users).map((user) => (
            <option key={user.id}>{user.name}</option>
          ))}
        </datalist>
        <Button type="submit">
          {existingUser ? `Log back in as ${form.values.userName}` : "Continue"}
        </Button>
      </Stack>
    </form>
  );
}
