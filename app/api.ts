import { getDateString } from "./utils";
import type { Dayjs } from "dayjs";

interface RequestOptions {
  json: object;
}

const URL_BASE = "https://api.findadateeveryonecando.com";

interface FetchResult<C> {
  response: Response;
  json: C;
}

const _fetch = async <C>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  options?: RequestOptions,
): Promise<FetchResult<C>> => {
  const response: Response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: options?.json ? JSON.stringify(options.json) : undefined,
  });
  if (!response.ok) {
    throw new Error("Error making request");
  }

  const json: C = await response.json();

  return {
    response: response,
    json: json,
  };
};

const request = {
  get: async <C>(url: string, options?: RequestOptions) => {
    return _fetch<C>(url, "GET", options);
  },
  post: async <C>(url: string, options: RequestOptions) => {
    return _fetch<C>(url, "POST", options);
  },
  delete: async <C>(url: string, options: RequestOptions) => {
    return _fetch<C>(url, "DELETE", options);
  },
};

export const create_event = async (
  name: string,
): Promise<FetchResult<EventResponse>> => {
  return request.post(`${URL_BASE}/events`, {
    json: { name },
  });
};

interface EventResponse {
  id: string;
  name: string;
  creation_date: string;
  modification_date: string;
}

export const get_event = async (
  id: string,
): Promise<FetchResult<EventResponse>> => {
  return request.get(`${URL_BASE}/events/${id}`);
};

interface UserResponse {
  id: string;
  name: string;
}

type UsersResponse = Array<UserResponse>;

export const get_users = async (
  id: string,
): Promise<FetchResult<UsersResponse>> => {
  return request.get(`${URL_BASE}/events/${id}/users`);
};

interface DateResponse {
  user_id: string;
  date: string;
}
type DatesResponse = Array<DateResponse>;

export const get_dates = async (
  id: string,
): Promise<FetchResult<DatesResponse>> => {
  return request.get(`${URL_BASE}/events/${id}/dates`);
};

export const create_user = async (
  event_id: string,
  user_name: string,
): Promise<FetchResult<UserResponse>> => {
  return request.post(`${URL_BASE}/events/${event_id}/users`, {
    json: { name: user_name },
  });
};

export const add_date = async (
  event_id: string,
  user_id: string,
  date: Dayjs,
) => {
  return request.post(`${URL_BASE}/events/${event_id}/users/${user_id}/dates`, {
    json: {
      date: getDateString(date),
    },
  });
};

export const remove_date = async (
  event_id: string,
  user_id: string,
  date: Dayjs,
) => {
  return request.delete(
    `${URL_BASE}/events/${event_id}/users/${user_id}/dates`,
    {
      json: {
        date: getDateString(date),
      },
    },
  );
};

interface FullEventResponse {
  id: string;
  name: string;
  creationDate: string;
  modificationDate: string;
  users: { [id: string]: { id: string; name: string; dates: Array<string> } };
}

export const fetchEvent = async (id: string): Promise<FullEventResponse> => {
  const [event, users, dates] = await Promise.all([
    get_event(id),
    get_users(id),
    get_dates(id),
  ]);

  return {
    id: event.json.id,
    name: event.json.name,
    creationDate: event.json.creation_date,
    modificationDate: event.json.modification_date,
    users: Object.fromEntries(
      users.json.map((user: UserResponse) => [
        user.id,
        {
          id: user.id,
          name: user.name,
          dates: dates.json
            .filter((date: any) => date.user_id === user.id)
            .map((date: any) => date.date),
        },
      ]),
    ),
  };
};
