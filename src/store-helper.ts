import { useUserStore } from "@/stores/user";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./main";
import { User } from "./datatypes";

async function getUser(uid: string): Promise<User> {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  let user: User = { balance: 0, id: "", location: "", name: "" };

  if (docSnap.exists()) {
    user = {
      balance: docSnap.data().balance,
      id: docSnap.data().id,
      location: docSnap.data().location,
      name: docSnap.data().name,
    };
  }
  return user;
}

async function refreshStore(uid: string) {
  const user: User = await getUser(uid);
  const userStore = useUserStore();
  userStore.setUser(user.balance, user.id, user.location, user.name);
}

export { refreshStore };
