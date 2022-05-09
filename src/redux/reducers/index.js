import { combineReducers } from 'redux'
import { baskets } from './baskets'
import { user } from './user'
import { users } from './users'


const Reducers = combineReducers({
    basketsState: baskets,
    userState: user,
    usersState: users
  
})

export default Reducers