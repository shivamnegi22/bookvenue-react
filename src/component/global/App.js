import { QueryClient, QueryClientProvider } from 'react-query';
import '../../css/global.css';
import ApplicationRoutes from '../../routes/applicationRoutes';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/primereact.min.css";  
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import 'primeicons/primeicons.css';
import { Provider as AuthProvider } from '../../context/AuthContext';
import { RouterProvider } from 'react-router-dom';
        

function App() {

  const queryClient = new QueryClient();

  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <PrimeReactProvider>
      <RouterProvider router={ApplicationRoutes}/>
    </PrimeReactProvider>
    </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
