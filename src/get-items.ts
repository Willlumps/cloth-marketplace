import { updateDoc, arrayUnion, collection, getDocs, getDoc, doc, QueryDocumentSnapshot, QuerySnapshot, DocumentSnapshot } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "./myconfig";
import { v4 as uuidv4 } from 'uuid';

async function getAllItems() {
  // TODO: make concrete type
  const userBucket: any[] = [];
  const users = collection(db, "users");

  await getDocs(users).then((qs: QuerySnapshot) => {
    qs.forEach((qd: QueryDocumentSnapshot) => {
      // Put all the users in a bucket
      userBucket.push(qd.data());
    });
  });

  const items = [];
  for (const i of userBucket) {
    for (const j of i.items) {
      items.push(j);
      items.push(j);
    }
  }

  return userBucket;
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


async function upload(file: any): Promise<string> {
    const metadata = {
      contentType: 'image/jpeg'
    };

    const uploadRef = ref(storage, 'shirt.jpeg');
    const uploadTask = uploadBytesResumable(uploadRef, file,  metadata);
    return getDownloadURL(uploadTask.snapshot.ref);
}

function addItem(user: string, info: object) {
  console.log(info);
  const userDoc = doc(db, "users", user);
  updateDoc(userDoc, { items: arrayUnion(info) }).then (() => { console.log("success"); });
}

export { getAllItems, getLocationByUser, upload, addItem }

