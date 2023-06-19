import { useRouter } from "next/router";
import { Title, Container, SimpleGrid, Grid } from "@mantine/core";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import EventContext from "@/app/event";
import SelectionCalendarCard from "@/components/selection_calendar_card";
import AttendeesListCard from "@/components/attendees_list_card";
import BestDatesCard from "@/components/best_dates_card";
import OtherOkDatesCard from "@/components/other_ok_dates_card";
dayjs.extend(localizedFormat);

export default function Event() {
  const router = useRouter();
  if (!router.query.uid) {
    return "No uid";
  }

  return (
    <EventContext.Provider initialState={{ uid: router.query.uid as string }}>
      <Container my="md">
        <SimpleGrid
          cols={2}
          spacing="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <EventTitle />
          <SelectionCalendarCard />
          <ResultsTitle />
          <Grid gutter="md">
            <Grid.Col>
              <AttendeesListCard />
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
    </EventContext.Provider>
  );
}

function EventTitle() {
  const event = EventContext.useContainer();
  return <Title order={1}>{event.name}</Title>;
}

function ResultsTitle() {
  return <Title order={2}>Results</Title>;
}
