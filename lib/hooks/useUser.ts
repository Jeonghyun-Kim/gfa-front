import useSWR from 'swr';

export default function useUser(): {
  loading: boolean;
  userId: string;
  mutateUser: (
    data?: User,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<unknown>;
} {
  const { data: user, mutate: mutateUser, error } = useSWR('/api/user');

  const loading = !user && !error;

  return {
    loading,
    userId: loading ? undefined : user.userId,
    mutateUser,
  };
}
