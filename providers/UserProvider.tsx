'use client';

import { MyUserContextPropvider } from '@/hooks/useUser';

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return <MyUserContextPropvider>{children}</MyUserContextPropvider>;
};

export default UserProvider;
