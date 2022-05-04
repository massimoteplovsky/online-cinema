import { useAppSelector } from '@/store/store';

export const useAuth = () => useAppSelector(({ user }) => user);
