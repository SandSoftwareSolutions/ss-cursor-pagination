const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function encodeCursor(value) {
  if (value === undefined) throw new TypeError("cursor value is required");
  return Buffer.from(encoder.encode(JSON.stringify(value))).toString("base64url");
}

export function decodeCursor(cursor) {
  if (typeof cursor !== "string" || !cursor) throw new TypeError("cursor must be a non-empty string");
  try { return JSON.parse(decoder.decode(Buffer.from(cursor, "base64url"))); }
  catch { throw new TypeError("cursor is not valid base64url JSON"); }
}

export function paginate(items, { after, limit = 20, getCursor = (item) => item?.id } = {}) {
  if (!Array.isArray(items)) throw new TypeError("items must be an array");
  if (!Number.isSafeInteger(limit) || limit < 1) throw new RangeError("limit must be a positive integer");
  const start = after === undefined ? 0 : (() => {
    const afterValue = decodeCursor(after);
    const index = items.findIndex((item) => JSON.stringify(getCursor(item)) === JSON.stringify(afterValue));
    if (index < 0) throw new RangeError("cursor does not belong to this result set");
    return index + 1;
  })();
  const data = items.slice(start, start + limit);
  const hasMore = start + data.length < items.length;
  return { data, pageInfo: { hasMore, nextCursor: hasMore && data.length ? encodeCursor(getCursor(data.at(-1))) : null } };
}
