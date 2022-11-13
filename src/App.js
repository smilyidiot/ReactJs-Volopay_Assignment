import {Route, BrowserRouter, Switch} from 'react-router-dom'

import Home from './components/Home'
import CardItemDetails from './components/CardItemDetails'

import './App.css'

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:id" component={CardItemDetails} />
      </Switch>
    </BrowserRouter>
  </>
)

export default App
