import * as SQLite from "expo-sqlite";

export const getDb = async () => {
  return SQLite.openDatabaseAsync("nhaccuaduy", {
    useNewConnection: true,
  });
};
export const initDatabase = async () => {
  const db = await getDb();

  const query = `
    CREATE TABLE IF NOT EXISTS playlists (
      name text PRIMARY KEY,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP
    );

    INSERT OR IGNORE INTO playlists (name)
    VALUES ('Yêu thích');

    CREATE TABLE IF NOT EXISTS playlist_items (
      playlist text,
      item_id text,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(playlist) REFERENCES playlists(name) ON DELETE CASCADE ON UPDATE CASCADE
    );
  `;

  try {
    await db.execAsync(query);
  } catch (error) {
    console.log("initDatabase error", error);
  }
};
