import { Subscription, UserDetails } from '@/types';
import { createContext } from 'react';
import { User } from '@supabase/auth-helpers-nextjs';

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscriprion: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}
