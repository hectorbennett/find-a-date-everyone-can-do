import { expect, test } from "vitest";
import { slugify } from "./slugify";

test("slugifies 'Hello World' to get 'hello-world'", () => {
  expect(slugify("Hello World")).toBe("hello-world");
});

test("slugifies 'A really really really long slug that is frankly far too long' to get 'a-really-really-really-long-slug'", () => {
  expect(
    slugify("A really really really long slug that is frankly far too long")
  ).toBe("a-really-really-really-long-slug");
});
