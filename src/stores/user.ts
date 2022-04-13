import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      balance: 0,
      id: "",
      location: "",
      name: "",
    }
  },
  actions: {
    setUser(balance: number, id: string, location: string, name: string) {
      this.balance = balance;
      this.id = id;
      this.location = location;
      this.name = name;
    }
  },
})
