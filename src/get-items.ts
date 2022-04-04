import { collection, getDocs, getDoc, doc, QueryDocumentSnapshot, QuerySnapshot, DocumentSnapshot } from "firebase/firestore";
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

async function upload(file: any) {
  return new Promise((resolve, reject) => {
    const metadata = {
      contentType: 'image/jpeg'
    };

    const img = uuidv4();
    const uploadRef = ref(storage, `${img}.jpeg`);
    const uploadTask = uploadBytesResumable(uploadRef, file,  metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
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
          console.log('File available at', downloadURL);
          resolve(downloadURL);
          return downloadURL;
        });
      }
    );
  });
}

export { getAllItems, getLocationByUser, upload }

