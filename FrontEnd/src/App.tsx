import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;
