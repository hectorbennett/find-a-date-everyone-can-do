import { EventInterface, User } from "./event";
import { getDateString } from "./utils";

interface RequestOptions {
  json: object;
}

const URL_BASE = "https://seahorse-app-2-53yve.ondigitalocean.app";

interface FetchResult {
  response: Response;
  json: any;
}

const _fetch = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  options?: RequestOptions
): Promise<FetchResult> => {
  const response: Response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: options?.json ? JSON.stringify(options.json) : undefined,
  });
  if (!response.ok) {
    return {
      response,
      json: null,
    };
  }

  const json = await response.json();

  return {
    response: response,
    json: json,
  };
};

const request = {
  get: async (url: string, options?: RequestOptions) => {
    return _fetch(url, "GET", options);
  },
  post: async (url: string, options: RequestOptions) => {
    return _fetch(url, "POST", options);
  },
  delete: async (url: string, options: RequestOptions) => {
    return _fetch(url, "DELETE", options);
  },
};

export const create_event = async (name: string) => {
  return request.post(`${URL_BASE}/events`, {
    json: { name },
  });
};

export const get_event = async (id: string) => {
  return request.get(`${URL_BASE}/events/${id}`);
};

export const get_users = async (id: string) => {
  return request.get(`${URL_BASE}/events/${id}/users`);
};

export const get_dates = async (id: string) => {
  return request.get(`${URL_BASE}/events/${id}/dates`);
};

export const create_user = async (event_id: string, user_name: string) => {
  return request.post(`${URL_BASE}/events/${event_id}/users`, {
    json: { name: user_name },
  });
};

export const add_date = async (
  event_id: string,
  user_id: string,
  date: Date
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
  date: Date
) => {
  return request.delete(
    `${URL_BASE}/events/${event_id}/users/${user_id}/dates`,
    {
      json: {
        date: getDateString(date),
      },
    }
  );
};

export const fetchEvent = async (id: string): Promise<EventInterface> => {
  const event = await get_event(id);
  const users = await get_users(id);
  const dates = await get_dates(id);
  return {
    id: event.json.id,
    name: event.json.name,
    users: Object.fromEntries(
      users.json.map((user: User) => [
        user.id,
        {
          id: user.id,
          name: user.name,
          dates: dates.json
            .filter((date: any) => date.user_id === user.id)
            .map((date: any) => date.date),
        },
      ])
    ),
  };
};
