DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS notes;
-- CREATE TABLE
CREATE TABLE "users" (
	"id"	INTEGER,
	"username"	TEXT UNIQUE,
	"password"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE "notes" (
	"id"	INTEGER,
	"content"	TEXT,
	"important"	BOOLEAN,
	"date"	DATETIME DEFAULT CURRENT_TIMESTAMP,
	"userid"	INTEGER,
	PRIMARY KEY("id"),
	FOREIGN KEY("userid") REFERENCES "users"("id") ON DELETE CASCADE
);
-- INSERT users
INSERT INTO users (username, password) VALUES ("namkha", "namkha");
INSERT INTO users (username, password) VALUES ("ngochoa", "ngochoa");
INSERT INTO users (username, password) VALUES ("quanghuy", "quanghuy");
INSERT INTO users (username, password) VALUES ("hoquang", "hoquang");

-- INSERT notes
INSERT INTO notes (content, important, userid) VALUES ("note11", true, 1);
INSERT INTO notes (content, important, userid) VALUES ("note12", false, 1);
INSERT INTO notes (content, important, userid) VALUES ("note21", true, 2);
INSERT INTO notes (content, important, userid) VALUES ("note22", false, 2);
INSERT INTO notes (content, important, userid) VALUES ("note31", true, 3);
INSERT INTO notes (content, important, userid) VALUES ("note32", false, 3);
INSERT INTO notes (content, important, userid) VALUES ("note41", true, 4);
INSERT INTO notes (content, important, userid) VALUES ("note42", false, 4);
