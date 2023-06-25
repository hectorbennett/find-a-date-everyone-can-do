import { getDateString } from "./utils";

interface RequestOptions {
  json: object;
}

const URL_BASE = "http://localhost:8080";

const _fetch = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  options?: RequestOptions
) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: options?.json ? JSON.stringify(options.json) : undefined,
  });
  if (!response.ok) {
    throw Error("Something went wrong");
  }
  return await response.json();
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
