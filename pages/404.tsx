import Container from "@/components/container";
import { PageHeader } from "@/components/page_header";
import { SimpleGrid, Title } from "@mantine/core";

/**
 *
 */
export default function NotFoundPage() {
  return (
    <>
      <PageHeader />
      <Container>
        <SimpleGrid spacing="md" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <Title>Page not found :(</Title>
        </SimpleGrid>
      </Container>
    </>
  );
}
