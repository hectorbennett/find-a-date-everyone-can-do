import { useRouter } from "next/router";
import {
  Title,
  Container,
  SimpleGrid,
  Grid,
  Text,
  Stack,
  Box,
} from "@mantine/core";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import EventContext from "@/app/event";
import SelectionCalendarCard from "@/components/selection_calendar_card";
import UserListCard from "@/components/user_list_card";
import BestDatesCard from "@/components/best_dates_card";
import OtherOkDatesCard from "@/components/other_ok_dates_card";
import CreateNewUser from "@/components/create_new_user";
import EventNotFoundCard from "@/components/event_not_found";
import SharePage from "@/components/share_page";
import LoadingPage from "@/components/loading_page";
import Head from "next/head";

dayjs.extend(localizedFormat);

export default function Event() {
  const router = useRouter();
  const id = router.query.id;
  if (!id) {
    return <LoadingPage />;
  }

  return (
    <EventContext.Provider initialState={{ id: router.query.id as string }}>
      <EditEvent />
    </EventContext.Provider>
  );
}

function EditEvent() {
  const event = EventContext.useContainer();

  if (event.isLoading) {
    return <LoadingPage />;
  }

  if (event.eventNotFound) {
    return <EventNotFound />;
  }

  if (!event.currentUser) {
    return <EnterName />;
  }

  return (
    <>
      <Head>
        <title>{event.name} | Find a date everyone can do</title>
        <meta
          name="description"
          content="Meta description for the About page"
        />
      </Head>
      <Container my="md">
        <Stack spacing="lg" my="xl">
          <EventTitle />
          <Greeting />
        </Stack>

        <SimpleGrid
          cols={2}
          spacing="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <Container m={0} p={0}>
            <SelectionCalendarCard />
          </Container>
          <Grid gutter="md">
            <Grid.Col>
              <SharePage />
            </Grid.Col>
            <Grid.Col>
              <UserListCard />
            </Grid.Col>
            <Grid.Col>
              <BestDatesCard />
            </Grid.Col>
            <Grid.Col>
              <OtherOkDatesCard />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Container>
    </>
  );
}

function EventTitle() {
  const event = EventContext.useContainer();
  if (!event.name) {
    return null;
  }
  return (
    <Title order={1} lineClamp={2} title={event.name}>
      {event.name}
    </Title>
  );
}

function Greeting() {
  const event = EventContext.useContainer();
  if (!event.currentUser?.name) {
    return null;
  }
  return (
    <Box>
      <Text span>Hi</Text>{" "}
      <Text span fw="bold">
        {event.currentUser.name}
      </Text>
      <Text span>!</Text>
    </Box>
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

function EventNotFound() {
  return (
    <Container my="md">
      <SimpleGrid spacing="md" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <Title order={1}>Find a date everyone can do</Title>
        <EventNotFoundCard />
      </SimpleGrid>
    </Container>
  );
}
