import { auth } from './config/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import Calculator from './components/calculator/Calculator'
import Calculations from './components/calculations/Calculations'
import './styles/App.scss';
import { SignIn } from './components/authentication/Auth'

function App() {
  const [user] = useAuthState(auth)
  return (
    <section className="App">
      {user ? (
        <>
          <Calculator />
          <Calculations />
        </>
      ) : (
          <SignIn />
        )}
    </section>
  );
}

export default App;
