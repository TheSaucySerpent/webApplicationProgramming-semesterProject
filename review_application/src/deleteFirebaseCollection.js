import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from './firebaseConfig.js';

async function deleteCollection() {
  const reviewsCollection = collection(firestore, 'reviews');
  const reviewsSnapshot = await getDocs(reviewsCollection);
  
  const deletePromises = reviewsSnapshot.docs.map((doc) => {
    return deleteDoc(doc.ref); // delete each document in the collection
  });

  // wait for all delete operations to complete
  await Promise.all(deletePromises);
  console.log("All reviews deleted successfully!");
}

deleteCollection().catch((error) => {
  console.error("Error deleting reviews collection:", error);
});
