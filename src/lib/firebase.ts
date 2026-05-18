import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error("Login Error Details:", error);
    if (error.code === 'auth/unauthorized-domain') {
      const currentDomain = window.location.hostname;
      alert(`ERROR: Dominio no autorizado.\n\nPor favor, agrega "${currentDomain}" a la lista de dominios autorizados en tu consola de Firebase (Autenticación > Ajustes > Dominios autorizados).`);
    } else if (error.code === 'auth/popup-blocked') {
      alert("La ventana emergente fue bloqueada por el navegador. Por favor permite las ventanas emergentes para este sitio.");
    } else {
      alert("Error al iniciar sesión: " + (error.message || "Error desconocido"));
    }
    throw error;
  }
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Firestore Error during ${operationType} on ${path}:`, message);
  throw error instanceof Error ? error : new Error(message);
}
