import FetchUser from './components/FetchUser';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { AuthProvider } from './utils/AuthContext';
import Routes from './Routes';

import fetcher from './utils/fetcher';

function App() {
  return (
    <BrowserRouter>
      <SWRConfig value={{ fetcher }}>
        <AuthProvider>
          <FetchUser>
            <Routes />
          </FetchUser>
        </AuthProvider>
      </SWRConfig>
    </BrowserRouter>
  );
}

export default App;
