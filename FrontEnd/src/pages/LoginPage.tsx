import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppState } from '../store';
import { loginAction, logoutAction } from '../store/actions/auth.action';

function LoginPage() {
  const dispatch: AppDispatch = useDispatch();

  const isAuthenticated: boolean = useSelector((state: AppState) => state.authReducer.isAuthenticated);

  const handleLogin = (): void => {
    dispatch(loginAction(''));
  };

  const handleLogout = (): void => {
    dispatch(logoutAction());
  };

  return (
    <>
      <div>Login</div>
      {isAuthenticated ? 'true' : 'false'}
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default LoginPage;
