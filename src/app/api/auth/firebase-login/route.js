import { getAuth } from 'firebase-admin/auth';
import { initializeApp, applicationDefault } from 'firebase-admin/app';

const app = initializeApp({
  credential: applicationDefault(), 
});

export async function POST(request) {
  const { token } = await request.json();

  try {
    const decoded = await getAuth().verifyIdToken(token);
    console.log("User Verified:", decoded);
    return new Response(JSON.stringify({ status: 'success', user: decoded }), {
      status: 200,
    });
  } catch (err) {
    console.error("Token verification failed:", err);
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
}
