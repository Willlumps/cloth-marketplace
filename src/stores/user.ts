import { defineStore } from "pinia";
import { User } from "../datatypes";

export const useUserStore = defineStore("user", {
  state: (): User => {
    return {
      balance: 0,
      id: "",
      location: "",
      name: "",
    };
  },
  persist: true,
  actions: {
    setUser(balance: number, id: string, location: string, name: string) {
      this.balance = balance;
      this.id = id;
      this.location = location;
      this.name = name;
    },
  },
});
