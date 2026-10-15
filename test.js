import assert from "node:assert/strict";
import test from "node:test";
import { decodeCursor, encodeCursor, paginate } from "./src/index.js";
test("round-trips opaque cursor payloads", () => assert.deepEqual(decodeCursor(encodeCursor({ createdAt: "2026-01-01", id: "u1" })), { createdAt: "2026-01-01", id: "u1" }));
test("paginates without duplicating records", () => { const records = [{ id: "a" }, { id: "b" }, { id: "c" }]; const first = paginate(records, { limit: 2 }); const second = paginate(records, { limit: 2, after: first.pageInfo.nextCursor }); assert.deepEqual(first.data.map((x) => x.id), ["a", "b"]); assert.deepEqual(second.data.map((x) => x.id), ["c"]); assert.equal(second.pageInfo.hasMore, false); });
test("rejects cursors from another result set", () => assert.throws(() => paginate([{ id: "a" }], { after: encodeCursor("x") }), RangeError));
