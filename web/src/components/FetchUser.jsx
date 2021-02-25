import { useAuth } from '../utils/AuthContext';

const FetchUser = ({ children }) => {
  const { loading } = useAuth();

  return <>{loading ? null : children}</>;
};

export default FetchUser;
