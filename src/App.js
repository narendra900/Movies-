import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import PopularMovies from './components/Popular'
import MovieItems from './components/MovieItemDetails'
import SearchMovies from './components/SearchMovies'
import Account from './components/Account'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/PageNotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={PopularMovies} />
    <ProtectedRoute exact path="/movies/:id" component={MovieItems} />
    <ProtectedRoute exact path="/search" component={SearchMovies} />
    <ProtectedRoute exact path="/account" component={Account} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
