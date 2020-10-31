import { auth } from './config/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import Calculator from './components/calculator/Calculator'
import Calculations from './components/calculations/Calculations'
import './styles/App.scss';

function App() {
  const [user] = useAuthState(auth)
  return (
    <div className="App">
      <Calculator />
      <Calculations />
    </div>
  );
}

export default App;
