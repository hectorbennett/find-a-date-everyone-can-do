/* if we arrive at /event/<id>, redirect to event/<event_name>/<id> */

export default function Index() {
  return null;
}

export async function getServerSideProps(context: any) {
  let id = context.query.event_slug;
  context.res.writeHead(301, { Location: `/event/slug/${id}` });
  context.res.end();
  return true;
}
