import { Database } from 'better-sqlite3'
const options = {}
export const db = new Database('foobar.db', options);
db.pragma('journal_mode = WAL');
