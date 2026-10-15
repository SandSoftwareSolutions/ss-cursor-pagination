export declare function encodeCursor(value: unknown): string;
export declare function decodeCursor<T = unknown>(cursor: string): T;
export interface PageInfo { hasMore: boolean; nextCursor: string | null; }
export declare function paginate<T>(items: T[], options?: { after?: string; limit?: number; getCursor?: (item: T) => unknown }): { data: T[]; pageInfo: PageInfo };
