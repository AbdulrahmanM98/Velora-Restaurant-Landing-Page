# Velora Restaurant Landing Page

A premium **restaurant landing page** designed as a portfolio project, then extended with a lightweight reservation backend and REST API.

<img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85" alt="Velora restaurant preview" width="100%">

## Project Goal

Velora started as a high-end one-page restaurant landing experience. It was then extended beyond a static front end with a working reservation flow to demonstrate both visual design and basic system integration.

## Highlights

- Premium responsive landing page
- Signature menu and private dining sections
- Reservation form connected to a Node.js / Express backend
- Lightweight JSON storage for demo reservations
- Admin dashboard for reviewing reservations
- Reservation status updates: pending, confirmed, cancelled
- Full demo CRUD API: GET, POST, PATCH, DELETE
- Postman-friendly REST API
- Mobile navigation, animations, validation, and user feedback
- Ready for deployment on a Node.js hosting platform such as Render

## Tech Stack

`HTML5` · `CSS3` · `Vanilla JavaScript` · `Node.js` · `Express.js` · `REST API` · `JSON Storage`

## Application Flow

```text
Visitor
  ↓
Landing Page / Reservation Form
  ↓
Node.js + Express REST API
  ↓
reservations.json
  ↓
Admin Dashboard
```

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Check API status |
| `GET` | `/api/reservations` | Read all reservations |
| `POST` | `/api/reservations` | Create a reservation |
| `PATCH` | `/api/reservations/:id/status` | Update reservation status |
| `DELETE` | `/api/reservations/:id` | Delete a reservation |

### Example POST Body

```json
{
  "name": "Demo Guest",
  "phone": "+966500000000",
  "date": "2026-10-20",
  "guests": "2 guests",
  "time": "8:00 PM",
  "occasion": "Dinner",
  "notes": "Window seat"
}
```

## Run Locally

Requirements: Node.js 18+

```bash
npm install
npm start
```

Then open:

- Landing page: `http://localhost:3000`
- Admin dashboard: `http://localhost:3000/admin.html`
- API health: `http://localhost:3000/api/health`

## Project Structure

```text
Velora-Restaurant-Landing-Page/
├── public/
│   ├── index.html
│   └── admin.html
├── data/
│   └── reservations.json
├── server.js
├── package.json
├── render.yaml
├── .gitignore
└── README.md
```

## Visual Direction

| Dining atmosphere | Signature dish | Private dining |
|---|---|---|
| <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=700&q=80" width="260"> | <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80" width="260"> | <img src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=700&q=80" width="260"> |

## Important Note

This is a portfolio/demo implementation. The JSON file is intentionally used as lightweight storage to keep the API flow easy to understand.

For production usage, the next improvements would be:

- PostgreSQL or Supabase for persistent cloud storage
- Authentication for the admin dashboard
- Server-side validation and rate limiting
- Real notification / email integration

## Deployment

The repository includes a `render.yaml` configuration. A Node.js web service can use:

```text
Build command: npm install
Start command: npm start
```

---

**Portfolio focus:** Landing Page Design · REST API · Node.js/Express · CRUD · API Testing
