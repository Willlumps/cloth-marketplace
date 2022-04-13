type Item = {
  id: string;
  img: string;
  name: string;
  price: number;
  sold: boolean;
  tags: Array<string>;
  user: string;
};

type User = {
  balance: number;
  id: string;
  location: string;
  name: string;
};

export { Item, User };
