import {
  Group,
  Table,
  TextInput,
  Title,
  Text,
  Center,
  Box,
  Container,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
  rem,
  Grid,
  Card,
  Stack,
} from "@mantine/core";
import { Calendar as MantineCalendar } from "@mantine/dates";
import { useRouter } from "next/router";
import EventContext from "@/app/event";
import styles from "./calendar.module.scss";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
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
          <Card withBorder shadow="sm" radius="md">
            <Card.Section inheritPadding withBorder py="sm">
              <Stack spacing="xs">
                <Text weight={500}>Calendar</Text>
                <Text c="dimmed" fz="sm">
                  Select the dates you are available
                </Text>
              </Stack>
            </Card.Section>
            <Card.Section inheritPadding pt="xs" pb="xl">
              <Calendar />
            </Card.Section>
          </Card>

          <Title order={2}>Results</Title>

          <Grid gutter="md">
            <Grid.Col>
              <Card withBorder shadow="sm" radius="md">
                <Card.Section inheritPadding py="xs">
                  <Stack>
                    <Text weight={500}>Going</Text>
                    <Text c="dimmed" fz="sm">
                      The following people have marked their availability
                    </Text>
                  </Stack>
                </Card.Section>

                <Card.Section inheritPadding py="xs">
                  <Group position="apart">
                    <ListOfPeopleGoing />
                  </Group>
                </Card.Section>
              </Card>
            </Grid.Col>
            <Grid.Col>
              <Card withBorder shadow="sm" radius="md">
                <Card.Section inheritPadding py="xs">
                  <Stack>
                    <Text weight={500}>Best dates</Text>
                    <Text c="dimmed" fz="sm">
                      Everyone who has marked their availability can make these
                      dates
                    </Text>
                  </Stack>
                </Card.Section>

                <Card.Section inheritPadding py="xs">
                  <Group position="apart">
                    <DatesEveryoneCanDo />
                  </Group>
                </Card.Section>
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
  return (
    <EventContext.Provider initialState={{ uid: router.query.uid as string }}>
      <Center>
        <Box>
          <Container>
            <Header />
          </Container>
          <Container>
            <Name />
          </Container>
          <Group position="center">
            <Calendar />
          </Group>
          <BestDates />
        </Box>
      </Center>
    </EventContext.Provider>
  );
}

function Header() {
  const event = EventContext.useContainer();
  return (
    <div>
      {/* <Title order={1}>Find a date everyone can do</Title> */}
      <Title order={1}>{event.name}</Title>
    </div>
  );
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

function Calendar() {
  const event = EventContext.useContainer();

  const handleSelect = (date: Date) => {
    const isSelected = event.dateIsSelected(date);
    if (isSelected) {
      event.deselectDate(date);
    } else {
      event.selectDate(date);
    }
  };

  return (
    <Group position="center">
      <MantineCalendar
        weekendDays={[]}
        size="xs"
        getDayProps={(date) => ({
          selected: event.dateIsSelected(date),
          onClick: () => handleSelect(date),
        })}
        renderDay={(date) => <CalendarDay date={date} />}
        styles={(theme) => ({
          day: {
            overflow: "hidden",
            display: "block",
            "&:hover": {
              background: "none",
            },
            "&[data-selected]": {
              background: "none",
              color: "black",
              border: "none",
              "&:hover": {
                background: "none",
              },
            },
          },
        })}
      />
    </Group>
  );
}

function CalendarDay({ date }: { date: Date }) {
  const event = EventContext.useContainer();
  const day = date.getDate();
  const selection_count = event.getDateSelectionCount(date);
  return (
    <div
      className={styles.day}
      style={{ background: event.getEventHeatColour(date) }}
    >
      <div>{day}</div>
      {/* <div>{selection_count}</div> */}
    </div>
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
