import {
  Group,
  Table,
  TextInput,
  Title,
  Text,
  Container,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
  rem,
  Grid,
} from "@mantine/core";
import { useRouter } from "next/router";
import EventContext from "@/app/event";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Card from "@/components/card";
import SelectionCalendar from "@/components/selection_calendar";
dayjs.extend(localizedFormat);

export default function Event() {
  const router = useRouter();
  const theme = useMantineTheme();
  if (!router.query.uid) {
    return "No uid";
  }

  const PRIMARY_COL_HEIGHT = rem(300);

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  return (
    <EventContext.Provider initialState={{ uid: router.query.uid as string }}>
      <Container my="md">
        <SimpleGrid
          cols={2}
          spacing="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <Header />
          <Card title="Calendar" note="Select the dates you are available">
            <Group position="center">
              <SelectionCalendar />
            </Group>
          </Card>

          <Title order={2}>Results</Title>

          <Grid gutter="md">
            <Grid.Col>
              <Card
                title="Going"
                note="The following people have marked their availability"
              >
                <ListOfPeopleGoing />
              </Card>
            </Grid.Col>
            <Grid.Col>
              <Card
                title="Best dates"
                note="Everyone who has marked their availability can make these dates"
              >
                <DatesEveryoneCanDo />
              </Card>
            </Grid.Col>

            <Grid.Col span={6}>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Container>
    </EventContext.Provider>
  );
}

function Header() {
  const event = EventContext.useContainer();
  return <Title order={1}>{event.name}</Title>;
}

function Name() {
  const event = EventContext.useContainer();
  return (
    <TextInput
      placeholder="Enter your name here"
      label="What's your name"
      variant="filled"
      value={event.currentUser}
    />
  );
}

function BestDates() {
  return (
    <>
      <Title order={3}>Dates everyone can do</Title>
      <DatesEveryoneCanDo />
      <Title order={3}>Other dates</Title>
      <OtherOkDates />
    </>
  );
}

function DatesEveryoneCanDo() {
  const event = EventContext.useContainer();
  const user_count = event.attendees.length;

  const dates = Object.entries(event.date_counts)
    .filter((entry) => entry[1] === user_count)
    .sort((a, b) => {
      return new Date(a[0]).valueOf() - new Date(b[0]).valueOf();
    })
    .map((entry) => ({ date: entry[0], count: entry[1] }));

  if (!dates.length) {
    return <Text>There are no dates everyone can do :(</Text>;
  }

  const rows = dates.map(({ date }) => (
    <tr key={date}>
      <td>{dayjs(date).format("LL")}</td>
    </tr>
  ));
  return (
    <Table>
      <tbody>{rows}</tbody>
    </Table>
  );
}

function OtherOkDates() {
  const event = EventContext.useContainer();
  const user_count = event.attendees.length;

  const dates = Object.entries(event.date_counts)
    .filter((entry) => entry[1] !== user_count)
    .sort((a, b) => {
      return new Date(a[0]).valueOf() - new Date(b[0]).valueOf();
    })
    .sort((a, b) => {
      return b[1] - a[1];
    })
    .map((entry) => ({ date: entry[0], count: entry[1] }));

  return <DateTable data={dates} />;
}

function DateTable({ data }: { data: Array<{ date: string; count: number }> }) {
  const rows = data.map(({ date, count }) => (
    <tr key={date}>
      <td>{dayjs(date).format("LL")}</td>
      <td>{count}</td>
    </tr>
  ));
  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

function ListOfPeopleGoing() {
  const event = EventContext.useContainer();

  if (!event.attendees.length) {
    return <Text>No one has marked their availability yet.</Text>;
  }

  const rows = event.attendees.map((name) => (
    <tr key={name}>
      <td>{name}</td>
    </tr>
  ));

  return (
    <Table>
      <tbody>{rows}</tbody>
    </Table>
  );
}
