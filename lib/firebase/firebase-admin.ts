import { initializeApp, cert, getApps } from 'firebase-admin/app';

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  }),
};

const app = !getApps().length
  ? initializeApp(firebaseAdminConfig)
  : getApps()[0];

export default app;
