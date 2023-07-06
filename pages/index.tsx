import { SimpleGrid, Stack, Title, Text, Box, Skeleton } from "@mantine/core";
import Card from "@/components/card";
import Container from "@/components/container";
import CreateEvent from "@/components/create_event";
import { PageHeader } from "@/components/page_header";

function TitleAndInfo() {
  return (
    <Card>
      <Stack spacing="lg" m="sm" mb="lg" align="center">
        <Title order={1} lineClamp={2}>
          Create new event
        </Title>
        <Skeleton width={200} height={100} animate={false} />
        <Text align="center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </Stack>
    </Card>
  );
}

function Thing2() {
  return (
    <Card>
      <Box m="sm">
        <Text align="center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </Box>
    </Card>
  );
}

export default function Index() {
  return (
    <Stack spacing={5}>
      <TitleAndInfo />
      <CreateEvent />
      <Thing2 />
    </Stack>
  );
}
