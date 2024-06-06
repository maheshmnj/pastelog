// src/services/LogService.ts
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { Log } from '../_models/Log';

class LogService {
    private logCollection = collection(db, 'logs_dev');
    async fetchLogs(): Promise<Log[]> {
        const querySnapshot = await getDocs(this.logCollection);
        const logs: Log[] = [];
        querySnapshot.forEach((doc) => {
            logs.push(Log.fromFirestore(doc));
        });
        return logs;
    }

    async fetchLogById(id: string): Promise<Log | null> {
        const docRef = doc(this.logCollection, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return Log.fromFirestore(docSnap);
        } else {
            return null;
        }
    }

    async publishLog(log: Log): Promise<string> {
        try {
            const docRef = await addDoc(this.logCollection, log.toFirestore());
            if (docRef.id) {
                return docRef.id;
            }
            return '';
        } catch (e) {
            return '';
        }
    }

    async updateLog(id: string, log: Log): Promise<void> {
        const docRef = doc(this.logCollection, id);
        await updateDoc(docRef, log.toFirestore());
    }
}

export default LogService;