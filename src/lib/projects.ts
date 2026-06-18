import { db, auth, handleFirestoreError } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

const COLLECTION_NAME = 'projects';

export interface Project {
  id?: string;
  title: string;
  description: string;
  coverImage: string;
  carouselImages: string[];
  createdAt?: any;
  updatedAt?: any;
  createdBy?: string;
  subtitle?: string;
  empresa?: string;
  localizacion?: string;
  ano?: string;
  programa?: string;
  escala?: string;
}

export async function getProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return [];

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || 'Proyecto sin título',
        description: data.description || '',
        coverImage: data.coverImage || '',
        carouselImages: Array.isArray(data.carouselImages) ? data.carouselImages : [],
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        createdBy: data.createdBy,
        subtitle: data.subtitle || '',
        empresa: data.empresa || '',
        localizacion: data.localizacion || '',
        ano: data.ano || '',
        programa: data.programa || '',
        escala: data.escala || ''
      } as Project;
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    // Fallback if index is missing
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  }
}

export async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...project,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: auth.currentUser?.uid
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, 'CREATE' as any, COLLECTION_NAME);
  }
}

export async function updateProject(id: string, project: Partial<Project>) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...project,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, 'UPDATE' as any, COLLECTION_NAME);
  }
}

export async function deleteProject(id: string) {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    handleFirestoreError(error, 'DELETE' as any, COLLECTION_NAME);
  }
}
