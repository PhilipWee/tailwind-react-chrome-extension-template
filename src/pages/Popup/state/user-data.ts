import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserData {
  apiKey: string;
  enabled: boolean;
}

export const useUserData = create<UserData>(
  //@ts-ignore
  persist(
    (set, get) => ({
      apiKey: '',
      enabled: true,
    }),
    {
      name: 'user-data', // unique name
      //   getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    }
  )
);
