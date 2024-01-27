/**
 * [id].tsx
 */

import EventContext, { EventInterface } from "@/app/event";
import { fetchEvent } from "@/app/api";
import { from_base_64, is_uuid_v4, to_base_64 } from "@/utils/parse_uuids";
import { slugify } from "@/utils/slugify";
import { EditEventPage } from "@/components/pages";

/**
 * Event page
 */
export default function Event({ event }: { event: EventInterface }) {
  return (
    <EventContext.Provider initialState={{ event: event }}>
      <EditEventPage />
    </EventContext.Provider>
  );
}

/**
 *
 * @param context
 */
export async function getServerSideProps(context: any) {
  let id = context.query.id;

  if (is_uuid_v4(id)) {
    /* if an old style url id */
    id = to_base_64(id);
  }

  const uuid_v4 = from_base_64(id);
  let event = null;
  try {
    event = await fetchEvent(uuid_v4);
  } catch {
    return {
      notFound: true,
    };
  }

  if (!event.id) {
    return {
      notFound: true,
    };
  }

  let slug = slugify(event.name);

  if (slug !== context.query.event_slug || id !== context.query.id) {
    context.res.writeHead(301, { Location: `/event/${slug}/${id}` });
    context.res.end();
    return true;
  }

  return {
    props: {
      event: event,
    },
  };
}
