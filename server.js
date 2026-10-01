const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'reservations.json');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, '[]', 'utf8');

function readReservations() {
  try {
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  } catch {
    return [];
  }
}

function writeReservations(rows) {
  fs.writeFileSync(dataFile, JSON.stringify(rows, null, 2), 'utf8');
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Velora Reservations API' });
});

app.get('/api/reservations', (req, res) => {
  res.json(readReservations().slice().reverse());
});

app.post('/api/reservations', (req, res) => {
  const { name, phone, date, guests, time, occasion = '', notes = '' } = req.body || {};

  if (!name || !phone || !date || !guests || !time) {
    return res.status(400).json({
      status: 'error',
      message: 'Name, phone, date, guests and time are required.'
    });
  }

  const reservations = readReservations();
  const nextId = reservations.length
    ? Math.max(...reservations.map(r => Number(r.id) || 0)) + 1
    : 1;

  const reservation = {
    id: nextId,
    name: String(name).trim(),
    phone: String(phone).trim(),
    date,
    guests,
    time,
    occasion,
    notes,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  reservations.push(reservation);
  writeReservations(reservations);

  res.status(201).json({
    status: 'success',
    message: 'Reservation stored successfully.',
    id: reservation.id
  });
});

app.patch('/api/reservations/:id/status', (req, res) => {
  const allowed = ['pending', 'confirmed', 'cancelled'];
  const { status } = req.body || {};

  if (!allowed.includes(status)) {
    return res.status(400).json({
      status: 'error',
      message: 'Status must be pending, confirmed or cancelled.'
    });
  }

  const reservations = readReservations();
  const id = Number(req.params.id);
  const reservation = reservations.find(r => Number(r.id) === id);

  if (!reservation) {
    return res.status(404).json({
      status: 'error',
      message: 'Reservation not found.'
    });
  }

  reservation.status = status;
  writeReservations(reservations);

  res.json({
    status: 'success',
    message: 'Reservation status updated.'
  });
});

app.delete('/api/reservations/:id', (req, res) => {
  const reservations = readReservations();
  const id = Number(req.params.id);
  const index = reservations.findIndex(r => Number(r.id) === id);

  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      message: 'Reservation not found.'
    });
  }

  reservations.splice(index, 1);
  writeReservations(reservations);

  res.json({
    status: 'success',
    message: 'Reservation deleted successfully.'
  });
});

app.listen(PORT, () => {
  console.log(`Velora running at http://localhost:${PORT}`);
  console.log(`Admin dashboard: http://localhost:${PORT}/admin.html`);
});
