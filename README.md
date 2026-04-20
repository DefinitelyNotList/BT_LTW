# Simple Blog React Project

Small React blog example with:

- Node and Express backend on port `8080`
- public blog routes
- authentication with protected admin routes
- reusable components split into separate files
- blog list and blog detail data loaded from APIs
- create, edit, delete, and reset post actions in the frontend demo

## Backend APIs

- `GET /api/blogs`
- `GET /api/blogs/:idOrSlug`

## Run

```bash
npm install
npm run server
npm run dev
```

The frontend expects the backend at `http://127.0.0.1:8080`.

## Notes

- The backend requested here is read-only and serves hardcoded posts.
- The protected dashboard still supports create, edit, and delete locally in the React app.
- Use `Reload API posts` in the dashboard to discard local changes and pull the hardcoded backend data again.

## Demo Login

```text
username: admin
password: blog123
```
