/**
 * 404.tsx
 */

import { SimpleGrid, Title } from "@mantine/core";
import { Container } from "@/components/atoms";

/**
 * Not found page. TODO: add to storybook
 */
export default function NotFoundPage() {
  return (
    <Container>
      <SimpleGrid spacing="md" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <Title>Page not found :(</Title>
      </SimpleGrid>
    </Container>
  );
}
