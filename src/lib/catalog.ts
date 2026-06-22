import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc,
  getDocs, 
  query, 
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from './firebase';

export interface CatalogItem {
  id?: string;
  name: string;
  description?: string;
  category: string;
  tag: string;
  image: string;
  specs: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  createdBy?: string;
}

const COLLECTION_NAME = 'catalog';

export async function getCatalogItems(): Promise<CatalogItem[]> {
  try {
    const catalogRef = collection(db, COLLECTION_NAME);
    const q = query(catalogRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return [];

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || 'Equipo sin nombre',
        description: data.description || '',
        category: data.category || 'distribucion',
        tag: data.tag || 'Disponible',
        image: data.image || 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
        specs: Array.isArray(data.specs) ? data.specs : [],
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        createdBy: data.createdBy
      } as CatalogItem;
    });
  } catch (error) {
    console.error("Firestore List Error:", error);
    // Fallback to fetch without ordering in case index is missing
    try {
      const snapshot = await getDocs(collection(db, COLLECTION_NAME));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        name: doc.data().name || 'Equipo sin nombre',
        description: doc.data().description || '',
        category: doc.data().category || 'distribucion',
        specs: doc.data().specs || []
      })) as CatalogItem[];
    } catch (innerError) {
      console.error("Fatal Firestore Error:", innerError);
      return [];
    }
  }
}

export async function createCatalogItem(item: Omit<CatalogItem, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...item,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: auth.currentUser?.uid
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, COLLECTION_NAME);
  }
}

export async function updateCatalogItem(id: string, updates: Partial<Omit<CatalogItem, 'id' | 'createdAt' | 'createdBy'>>) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
  }
}

export async function getCatalogItemById(id: string): Promise<CatalogItem | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.name || 'Equipo sin nombre',
      description: data.description || '',
      category: data.category || 'distribucion',
      tag: data.tag || 'Disponible',
      image: data.image || '',
      specs: Array.isArray(data.specs) ? data.specs : [],
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      createdBy: data.createdBy
    } as CatalogItem;
  } catch (error) {
    console.error("Error loading single catalog item:", error);
    return null;
  }
}

export async function deleteCatalogItem(id: string) {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
  }
}
