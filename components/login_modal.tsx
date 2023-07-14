import EventContext from "@/app/event";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";

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

export default function LoginModal() {
  const event = EventContext.useContainer();
  // const [opened, { open, close }] = useDisclosure(!event.currentUser);
  //   const isMobile = useMediaQuery("(max-width: 50em)");

  const [opened, setIsOpened] = useState(false);

  let timeout = useRef(setTimeout(() => {}));

  useEffect(() => {
    if (!event.currentUser) {
      timeout.current = setTimeout(() => {
        setIsOpened(true);
      }, 400);
    } else {
      clearTimeout(timeout.current);
      setIsOpened(false);
    }
  }, [event.currentUser]);

  return (
    <>
      <Modal
        closeOnClickOutside={false}
        withCloseButton={false}
        opened={opened}
        onClose={() => {}}
        title="Enter your name to continue"
        // fullScreen={isMobile}
      >
        <CreateNewUserForm />
      </Modal>
    </>
  );
}
