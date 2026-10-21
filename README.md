# @sandsoftwaresolutions/cursor-pagination

Encode opaque cursors and paginate already-sorted API results without offset drift.

```bash
npm install @sandsoftwaresolutions/cursor-pagination
```

Works with `import` and `require()`, and ships TypeScript types for both.

```js
import { paginate } from "@sandsoftwaresolutions/cursor-pagination";

const page = paginate(users, { limit: 20, after: requestUrl.searchParams.get("after") ?? undefined });
return Response.json(page);
```

The result is `{ data, pageInfo: { hasMore, nextCursor } }`. Pass `nextCursor` as `after` for the next page. By default the cursor stores `item.id`; provide `getCursor` for a stable compound key such as `{ createdAt, id }`.

`encodeCursor` and `decodeCursor` use base64url JSON for transport, not encryption or signing. Do not put secrets in a cursor; use signed links or a server-side session when cursors must be tamper-proof.
