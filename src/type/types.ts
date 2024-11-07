export type User = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: "male" | "female";
  hair: { color: string };
  address: { postalCode: string };
  department: string;
  company: { department: string };
};

export type Address = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
};

export type Company = {
  department: string;
  name: string;
  title: string;
  address: Address;
};

export type Crypto = {
  coin: string;
  wallet: string;
  network: string;
};

export type Bank = {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

export type DefaultUserNotFormatted = {
  address: Address;
  age: number;
  bank: Bank;
  birthDate: string;
  bloodGroup: string;
  company: Company;
  crypto: Crypto;
  ein: string;
  email: string;
  eyeColor: string;
  firstName: string;
  gender: "male" | "female";
  hair: { color: string; type: string };
  height: number;
  id: number;
  image: string;
  ip: string;
  lastName: string;
  macAddress: string;
  maidenName: string;
  password: string;
  phone: string;
  role: string;
  ssn: string;
  university: string;
  userAgent: string;
  username: string;
  weight: number;
};

export type DepartmentSummary = {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
};

export type SummaryByDepartment = Record<string, DepartmentSummary>;

export interface DataResponseUserAndDepartment {
  users: User[];
  summary: SummaryByDepartment;
}
