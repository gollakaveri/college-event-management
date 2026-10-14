# Kaveri College Event Management

## Folder structure
- `public/` — all frontend HTML pages, CSS, JavaScript and local images/assets.
- `index.js` — Express + MySQL backend/API.
- `database.sql` — schema/table setup example.
- `.env.example` — MySQL configuration template.

## Setup
1. Install Node.js and MySQL Server.
2. In MySQL Workbench, use your `college` schema and ensure the `events` table has: `event_id`, `event_name`, `event_type`, `event_date`, `venue`, `description`. See `database.sql` for the expected structure.
3. Copy `.env.example` to `.env` and enter your MySQL username/password.
4. From this project root, run `npm install` and then `npm start`.
5. Open `http://localhost:3000`.

The UI files for all CRUD operations are in `public/`: `insert.html` (Create), `list.html` (Read all), `listOne.html` (Search/read one), `update.html` (Update), and `delete.html` (Delete). The backend API remains in the root `index.js` file and serves the `public/` folder.
