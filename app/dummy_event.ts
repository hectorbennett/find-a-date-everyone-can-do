import { EventInterface } from "./event";

const DUMMY_EVENT: EventInterface = {
  name: "Camping trip 2023",
  uid: "x1D73Hxy",
  attendees: {
    Hector: {
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
    Cameron: {
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
    Ben: {
      "2023-06-25": true,
      "2023-06-28": true,
      "2023-07-03": true,
      "2023-07-02": true,
      "2023-07-04": true,
    },
  },
};

export default DUMMY_EVENT;
