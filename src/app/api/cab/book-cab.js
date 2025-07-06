export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { pickup, dropoff } = req.body;

    // Replace this with real API call (Uber/Ola integration)
    res.status(200).json({ eta: Math.floor(Math.random() * 10 + 3) });
  } else {
    res.status(405).end('Method Not Allowed');
  }
}
