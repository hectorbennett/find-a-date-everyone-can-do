import { useRouter } from "next/router";
import {
  Title,
  Container,
  SimpleGrid,
  Grid,
  Text,
  Button,
  Group,
} from "@mantine/core";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import EventContext from "@/app/event";
import SelectionCalendarCard from "@/components/selection_calendar_card";
import UserListCard from "@/components/user_list_card";
import BestDatesCard from "@/components/best_dates_card";
import OtherOkDatesCard from "@/components/other_ok_dates_card";
import CreateNewUser from "@/components/create_new_user";
dayjs.extend(localizedFormat);

export default function Event() {
  const router = useRouter();

  const id = router.query.id;

  console.log(router);

  console.log("id", id);
  if (!id) {
    return "Loading...";
  }

  return (
    <EventContext.Provider initialState={{ id: router.query.id as string }}>
      <EditEvent />
    </EventContext.Provider>
  );
}

function EditEvent() {
  const event = EventContext.useContainer();

  if (!event.currentUser) {
    return <EnterName />;
  }

  return (
    <Container my="md">
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <EventTitle />
        <Greeting />
        <SelectionCalendarCard />
        <Grid gutter="md">
          <Grid.Col>
            <UserListCard />
          </Grid.Col>
          <Grid.Col>
            <BestDatesCard />
          </Grid.Col>
          <Grid.Col>
            <OtherOkDatesCard />
          </Grid.Col>
          <Grid.Col></Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}

function EventTitle() {
  const event = EventContext.useContainer();
  return <Title order={1}>{event.name}</Title>;
}

function Greeting() {
  const event = EventContext.useContainer();
  return (
    <Group>
      <Text>
        Hi {event.currentUser?.name}, this page is for planning the event, and
        was created by `name here`.
      </Text>
      <Button onClick={() => event.logout()}>Logout</Button>
    </Group>
  );
}

function EnterName() {
  return (
    <Container my="md">
      <SimpleGrid spacing="md" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <EventTitle />
        <CreateNewUser />
      </SimpleGrid>
    </Container>
  );
}
