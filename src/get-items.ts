import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  QueryDocumentSnapshot,
  QuerySnapshot,
  DocumentSnapshot,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./main";
import { v4 as uuidv4 } from "uuid";
import { Item } from "./datatypes";

async function getAllItems() {
  const items: Item[] = [];
  const itemCollection = collection(db, "items");

  await getDocs(itemCollection).then((qs: QuerySnapshot) => {
    qs.forEach((qd: QueryDocumentSnapshot) => {
      if (qd.data().sold === false) {
        items.push(qd.data() as Item);
      }
    });
  });

  return items;
}

async function getUserInfoById(uid: string): Promise<string[]> {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  const res = [];

  if (docSnap.exists()) {
    console.log("hey");
    res.push(docSnap.data().name);
    res.push(docSnap.data().location);
  }
  return res;
}

async function getPersonalItems(user: string, sold: boolean) {
  const items: Item[] = [];
  const itemCollection = collection(db, "items");

  await getDocs(itemCollection).then((qs: QuerySnapshot) => {
    qs.forEach((qd: QueryDocumentSnapshot) => {
      if (qd.data().sold === sold && qd.data().user === user) {
        items.push(qd.data() as Item);
      }
    });
  });

  return items;
}

async function buyItem(id: string) {
  const ref = doc(db, "items", id);
  await updateDoc(ref, {
    sold: true
  });
}

async function removeItem(id: string) {
  // Remove from firestore
  await deleteDoc(doc(db, "items", id));

  // Remove image from storage
  const imgRef = ref(storage, id + ".jpeg");
  deleteObject(imgRef).then(() => {
    console.log("Image successfully removed from Firebase Storage");
  }).catch((error) => {
    console.log("Error removing image: ", error);
  });
}

async function getLocationByUser(user: string) {
  let location: string | undefined;
  const userDoc = doc(db, "users", user);
  await getDoc(userDoc).then((snapshot: DocumentSnapshot) => {
    if (snapshot.exists()) {
      location = snapshot.data().location;
    }
  });

  return location;
}

async function upload(file: any) {
  return new Promise((resolve, reject) => {
    const metadata = {
      contentType: "image/jpeg",
    };

    const img = uuidv4();
    const uploadRef = ref(storage, `${img}.jpeg`);
    const uploadTask = uploadBytesResumable(uploadRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error);
        reject();
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve([downloadURL, img]);
          return [downloadURL, img];
        });
      }
    );
  });
}

export { buyItem, getAllItems, getPersonalItems, getLocationByUser, upload, removeItem, getUserInfoById };
