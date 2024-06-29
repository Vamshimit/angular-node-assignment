interface Person {
    firstName: string;
    lastName: string;
    dateOfBirth?: string; // Optional as it's only present in sender
    IDNumber?: string; // Optional as it's only present in sender
    email?: string; // Optional as it's only present in recipient
    accountNumber?: string; // Optional as it's only present in recipient
    bank?: string; // Optional as it's only present in recipient
  }
  
  export interface Transaction {
    id: string;
    date: number;
    sender: Person;
    recipient: Person;
    amount: number;
    currencyCd: string;
    comments: string;
    status: string;
  }

