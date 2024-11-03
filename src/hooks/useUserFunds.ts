import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserFunds = async (userId: string) => {
  const { data } = await axios.get(`http://jdwd40.com/api/users/getFunds/${userId}`);
  return data;
};

export const useUserFunds = (userId: string | undefined) => {
  return useQuery(
    ['userFunds', userId],
    () => fetchUserFunds(userId!),
    {
      enabled: !!userId,
      refetchInterval: 30000, // Refetch every 30 seconds
    }
  );
};