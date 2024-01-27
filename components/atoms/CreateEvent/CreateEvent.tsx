/**
 * CreateEventForm.tsx
 */

import { useForm } from "@mantine/form";
import { Button, Stack, TextInput } from "@mantine/core";
import { Card } from "../Card";

/**
 * Form values to be submitted.
 */
export interface FormValues {
  /** The name of the event to create. */
  eventName: string;
}

/** Props for the CreateEvent component. */
interface CreateEventProps {
  /** Callback triggered on submit. */
  onSubmit: (formValues: FormValues) => void;
  /** Whether the form is in the process of submitting. */
  isSubmittingForm: boolean;
}

/**
 * Create Event form component.
 */
export function CreateEvent({ onSubmit, isSubmittingForm }: CreateEventProps) {
  const form = useForm<FormValues>({
    initialValues: {
      eventName: "",
    },

    validate: {
      eventName: (value) => {
        if (!value.length) {
          return "Please enter an event name";
        }
        if (value.length <= 2) {
          return "Please enter a longer event name";
        }
        if (value.length > 100) {
          return "Please enter a shorter event name";
        }
        return null;
      },
    },
  });

  return (
    <Card title="Event name" note="Enter a name for your event">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack spacing="sm" p="xs">
          <TextInput
            autoFocus
            size="md"
            placeholder="E.g. Camping Trip 2023"
            {...form.getInputProps("eventName")}
          />

          <Button type="submit" loading={isSubmittingForm}>
            Find a date!
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
