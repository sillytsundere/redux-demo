import './App.css'

//import components
import { CakeView } from './features/cake/CakeView'
import { IcecreamView } from './features/ice-cream/IcecreamView'
import { UserView } from './features/users/UserView'

function App() {
  return (
    <div className="App">
      <CakeView />
      <IcecreamView />
      <UserView />
    </div>
  )
}

export default App
