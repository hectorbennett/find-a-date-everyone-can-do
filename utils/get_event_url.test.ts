import { expect, test } from "vitest";
import { get_event_url } from "./get_event_url";

test("Generates a url from a uuidv4 and a name", () => {
  expect(
    get_event_url({
      id: "27b990c5-96e0-4331-b4a1-d9d136aac952",
      name: "This is a test name",
    }),
  ).toBe("/event/this-is-a-test-name/J7mQxZbgQzG0odnRNqrJUg==");
});
