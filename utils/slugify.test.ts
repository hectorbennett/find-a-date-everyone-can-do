import { expect, test } from "vitest";
import { slugify } from "./slugify";

test("slugifies 'Hello World' to get 'hello-world'", () => {
  expect(slugify("Hello World")).toBe("hello-world");
});

test("slugifies long strings to a sensible length'", () => {
  expect(
    slugify("A really really really long slug that is frankly far too long"),
  ).toBe("a-really-really-really-long-slug");
});
