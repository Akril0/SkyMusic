import { create } from 'zustand';
import {ViewType} from "@supabase/auth-ui-shared";

interface AuthModalStore {
  view:ViewType | undefined
  isOpen: boolean;
  setView:(view:ViewType) =>void;
  onOpen: (viewType: ViewType) => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  view: undefined,
  isOpen: false,
  setView:(view) => set({ view }),
  onOpen: (viewType) => set({ isOpen: true, view:viewType }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
