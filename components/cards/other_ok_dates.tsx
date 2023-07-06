import dayjs from "dayjs";
import { Box, Group, Spoiler, Table, Text, createStyles } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import EventContext from "@/app/event";
import Card from "../card";

const useStyles = createStyles((_theme) => ({
  dates_td: {
    verticalAlign: "top",
  },
  names_td: {
    maxWidth: 0,
    width: "100%",
  },
  ul: {
    margin: 0,
    padding: 0,
    paddingLeft: "1rem",
  },
  item: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export default function OtherOkDatesCard() {
  const event = EventContext.useContainer();
  const user_count = Object.keys(event.users).length;

  const dates = Object.entries(event.date_counts)
    .filter((entry) => entry[1] !== user_count)
    .sort((a, b) => {
      return new Date(a[0]).valueOf() - new Date(b[0]).valueOf();
    })
    .sort((a, b) => {
      return b[1] - a[1];
    })
    .map((entry) => ({
      date: entry[0],
      count: entry[1],
      who_cant_go: Object.values(event.users)
        .filter((user) => !user.dates.includes(entry[0]))
        .map((user) => user.name),
    }));

  const note = !user_count
    ? "No one has marked their availability yet."
    : user_count < 2
    ? "This will populate once 2 people have marked their availability."
    : "The following dates could work too, though not everyone can make them.";

  return (
    <Card title="Other ok dates" note={note}>
      {dates.length > 4 ? (
        <Spoiler
          maxHeight={180}
          showLabel={
            <Text fz="sm" m="xs">
              Show more
            </Text>
          }
          hideLabel={
            <Text fz="sm" m="xs">
              Show less
            </Text>
          }
        >
          <DateTable data={dates} />
        </Spoiler>
      ) : dates.length > 0 ? (
        <DateTable data={dates} />
      ) : null}
    </Card>
  );
}

function NameList({ names }: { names: Array<string> }) {
  const { classes } = useStyles();
  return (
    <ul className={classes.ul}>
      {names.map((name) => (
        <li title={name} key={name}>
          <div className={classes.item}>{name}</div>
        </li>
      ))}
    </ul>
  );
}

function DateTable({
  data,
}: {
  data: Array<{ date: string; count: number; who_cant_go: Array<string> }>;
}) {
  const { classes } = useStyles();
  const rows = data.map(({ date, count, who_cant_go }) => (
    <tr key={date}>
      <td className={classes.dates_td}>
        <Group noWrap py="0.2rem">
          <IconCalendar size={14} />{" "}
          <Box
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {dayjs(date).format("LL")}
          </Box>
        </Group>
      </td>
      <td className={classes.names_td}>
        <NameList names={who_cant_go} />
      </td>
    </tr>
  ));
  return (
    <Table verticalSpacing="md">
      <thead>
        <tr>
          <th>Date</th>
          <th>Who can&apos;t go</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
