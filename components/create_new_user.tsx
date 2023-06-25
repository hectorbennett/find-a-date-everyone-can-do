import { Button, TextInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import EventContext from "@/app/event";
import Card from "./card";

export default function CreateNewUser() {
  // const existingUser = event.getUserByName(name);

  // const handleLogin = () => {
  //   if (existingUser) {
  //     event.login(existingUser.uid);
  //   } else {
  //     event.createNewUser(name);
  //   }
  // };

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
      userName: (value) =>
        event.getUserByName(value)
          ? `${value} is already taken as a username`
          : !value.length
          ? "Please enter a name"
          : value.length > 2
          ? null
          : "Please enter a longer name",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    event.createNewUser(values.userName);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="sm">
        <TextInput
          placeholder="E.g. Bob Smith"
          {...form.getInputProps("userName")}
        />

        <Button type="submit">Continue</Button>
      </Stack>
    </form>
  );
}
