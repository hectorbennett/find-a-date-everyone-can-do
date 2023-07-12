import { to_base_64 } from "./parse_uuids";
import { slugify } from "./slugify";

export const get_event_url = ({ id, name }: { id: string; name: string }) => {
  return `/event/${slugify(name)}/${to_base_64(id)}`;
};
