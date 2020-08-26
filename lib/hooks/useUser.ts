import useSWR from 'swr';

export default function useUser() {
  const { data: user, mutate: mutateUser, error } = useSWR('/api/user');

  const loading = !user && !error;

  return {
    loading,
    userId: loading ? undefined : user.userId,
    mutateUser,
  };
}
