import { EventInterface } from "./event";

export const DUMMY_EVENT: EventInterface = {
  name: "Camping trip 2023",
  uid: "x1D73Hxy",
  attendees: {
    raQVAwXLBxTZaHP3NZ0Pb: {
      uid: "raQVAwXLBxTZaHP3NZ0Pb",
      name: "Hector",
      results: {
        "2023-06-13": true,
        "2023-06-14": true,
        "2023-06-16": true,
        "2023-06-17": true,
        "2023-06-23": true,
        "2023-06-24": true,
        "2023-06-29": true,
        "2023-07-03": true,
        "2023-07-05": true,
        "2023-07-06": true,
      },
    },
    "6TVUZciy0kPPTI_9fI92e": {
      uid: "6TVUZciy0kPPTI_9fI92e",
      name: "Cameron",
      results: {
        "2023-06-10": true,
        "2023-06-17": true,
        "2023-06-20": true,
        "2023-06-24": true,
        "2023-06-25": true,
        "2023-06-28": true,
        "2023-07-03": true,
        "2023-07-05": true,
        "2023-07-06": true,
      },
    },
    bcfZnqR_sbw9xj_papsSO: {
      uid: "bcfZnqR_sbw9xj_papsSO",
      name: "Ben",
      results: {
        "2023-06-25": true,
        "2023-06-28": true,
        "2023-07-03": true,
        "2023-07-02": true,
        "2023-07-04": true,
      },
    },
  },
};

export const NEW_EVENT: EventInterface = {
  name: "New event",
  uid: "abcdefg",
  attendees: {},
};
