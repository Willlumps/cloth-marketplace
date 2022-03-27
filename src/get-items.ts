import { collection, Firestore, getDocs, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";

async function getAllItems(db: Firestore) {
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

export { getAllItems }

