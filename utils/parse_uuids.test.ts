import { expect, test } from "vitest";
import {
  from_base_64,
  is_base_64,
  is_uuid_v4,
  to_base_64,
} from "./parse_uuids";

test("parses '27b990c5-96e0-4331-b4a1-d9d136aac952' to get 'J7mQxZbgQzG0odnRNqrJUg=='", () => {
  expect(to_base_64("27b990c5-96e0-4331-b4a1-d9d136aac952")).toBe(
    "J7mQxZbgQzG0odnRNqrJUg=="
  );
});

test("parses 'J7mQxZbgQzG0odnRNqrJUg==' to get '27b990c5-96e0-4331-b4a1-d9d136aac952'", () => {
  expect(from_base_64("J7mQxZbgQzG0odnRNqrJUg==")).toBe(
    "27b990c5-96e0-4331-b4a1-d9d136aac952"
  );
});

test("checks that 'J7mQxZbgQzG0odnRNqrJUg==' is base 64", () => {
  expect(is_base_64("J7mQxZbgQzG0odnRNqrJUg==")).toBe(true);
});

test("checks that '27b990c5-96e0-4331-b4a1-d9d136aac952' is not base 64", () => {
  expect(is_base_64("27b990c5-96e0-4331-b4a1-d9d136aac952")).toBe(false);
});

test("parses 'dc6813f1-f266-4676-911b-881ffacc7f72' to get '3GgT8fJmRnaRG4gf-sx_cg=='", () => {
  expect(to_base_64("dc6813f1-f266-4676-911b-881ffacc7f72")).toBe(
    "3GgT8fJmRnaRG4gf-sx_cg=="
  );
});

test("parses '3GgT8fJmRnaRG4gf-sx_cg=='  to get 'dc6813f1-f266-4676-911b-881ffacc7f72'", () => {
  expect(from_base_64("3GgT8fJmRnaRG4gf-sx_cg==")).toBe(
    "dc6813f1-f266-4676-911b-881ffacc7f72"
  );
});

test("checks that '27b990c5-96e0-4331-b4a1-d9d136aac952' is a uuid v4", () => {
  expect(is_uuid_v4("27b990c5-96e0-4331-b4a1-d9d136aac952")).toBe(true);
});

test("checks that '3GgT8fJmRnaRG4gf-sx_cg==' is not a uuid v4", () => {
  expect(is_uuid_v4("3GgT8fJmRnaRG4gf-sx_cg==")).toBe(false);
});
