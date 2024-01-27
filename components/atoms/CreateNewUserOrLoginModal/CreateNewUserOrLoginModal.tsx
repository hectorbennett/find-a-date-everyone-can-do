/**
 * CreateNewUserOrLoginModal.tsx
 */

import { Button, TextInput, Stack, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Card } from "../Card";

interface User {
  /** The user id. */
  id: string;
  /** The user name. */
  name: string;
}

/** CreateNewUser component props. */
interface CreateNewUserOrLoginModalProps {
  /** The existing users of this event. */
  users: Array<User>;

  /** On select an existing user */
  onLogin: (userId: string) => void;

  /** On create new user. */
  onCreateNewUser: (userName: string) => void;

  /** Whether or not it is open. */
  isOpen: boolean;
}

interface FormValues {
  userName: string;
}

/**
 * Create new user component (or login to an existing).
 */
export function CreateNewUserOrLoginModal({
  users,
  onLogin,
  onCreateNewUser,
  isOpen,
}: CreateNewUserOrLoginModalProps) {
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

  const existingUser =
    users.find((user) => user.name === form.values.userName) || null;

  const handleSubmit = async (values: FormValues) => {
    if (existingUser !== null) {
      onLogin(existingUser.id);
    } else {
      onCreateNewUser(values.userName);
    }
  };

  return (
    <Modal
      closeOnClickOutside={false}
      withCloseButton={false}
      opened={isOpen}
      onClose={() => {}}
      title="Enter your name to continue"
    >
      <Card title="Enter your name" note="Enter the name you want to use.">
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
              {users.map((user) => (
                <option key={user.id}>{user.name}</option>
              ))}
            </datalist>
            <Button type="submit">
              {existingUser
                ? `Log back in as ${form.values.userName}`
                : "Continue"}
            </Button>
          </Stack>
        </form>
      </Card>
    </Modal>
  );
}
