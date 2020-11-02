import { auth } from './config/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import Calculator from './components/calculator/Calculator'
import './styles/App.scss';
import { SignIn } from './components/authentication/Auth'

function App() {
  const [user] = useAuthState(auth)

  return (
    <section className="App">
      {user ? <Calculator /> : <SignIn />}
    </section>
  );
}

export default App;
