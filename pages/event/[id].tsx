import { Title, SimpleGrid, Grid, Text, Stack, Box } from "@mantine/core";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import EventContext, { EventInterface } from "@/app/event";
import SelectionCalendarCard from "@/components/selection_calendar_card";
import UserListCard from "@/components/user_list_card";
import BestDatesCard from "@/components/best_dates_card";
import OtherOkDatesCard from "@/components/other_ok_dates_card";
import CreateNewUser from "@/components/create_new_user";
import EventNotFoundCard from "@/components/event_not_found";
import SharePage from "@/components/share_page";
import Head from "next/head";
import LogoutButton from "@/components/logout_button";
import Container from "@/components/container";
import { PageHeader } from "@/components/page_header";
import { fetchEvent } from "@/app/api";

dayjs.extend(localizedFormat);

export default function Event({ event }: { event: EventInterface }) {
  return (
    <EventContext.Provider initialState={{ event: event }}>
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
    <>
      <Head>
        <title>{event.name} | Find a Date Everyone Can Do</title>
        <meta
          name="description"
          content="Meta description for the About page"
        />
      </Head>
      <PageHeader />
      <Container fluid>
        <EventTitle />

        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <Container m={0} p={0}>
            <SelectionCalendarCard />
          </Container>
          <Grid
            gutter="md"
            sx={{
              maxWidth: "100vw",
            }}
          >
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
        <Stack spacing="lg" my="xl">
          <LogoutButton />
        </Stack>
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
    <Stack spacing="lg" m="sm" mb="lg">
      <Title order={1} lineClamp={2} title={event.name}>
        {event.name}
      </Title>
    </Stack>
  );
}

function Greeting() {
  const event = EventContext.useContainer();
  if (!event.currentUser?.name) {
    return null;
  }
  return (
    <Box
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
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
    <>
      <PageHeader />
      <Container>
        <SimpleGrid spacing="md" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <EventTitle />
          <CreateNewUser />
        </SimpleGrid>
      </Container>
    </>
  );
}

function EventNotFound() {
  return (
    <>
      <PageHeader />
      <Container>
        <SimpleGrid spacing="md" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <Title order={1}>Find a Date Everyone Can Do</Title>
          <EventNotFoundCard />
        </SimpleGrid>
      </Container>
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const event = await fetchEvent(context.query.id);
    return {
      props: {
        event: event,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
