import { CLEAR_DATA, PRODUCT_STATE_CHANGE, ROOM_STATE_CHANGE, USERS_DATA_STATE_CHANGE, USERS_LIKES_STATE_CHANGE, USERS_POSTS_STATE_CHANGE } from "../constants"

const initialState = {
    users: [],
    feed: [],
    rooms: [],
    products:[],
    usersFollowingLoaded: 0,
}

export const users = (state = initialState, action) => {
    switch (action.type) {
        case USERS_DATA_STATE_CHANGE:
            return {
                ...state,
                users: [...state.users, action.user]
            }
        case PRODUCT_STATE_CHANGE:
                return {
                    ...state,
                    products: [...state.products, action.products]
                }
        case ROOM_STATE_CHANGE:
                return {
                    ...state,
                    rooms: [...state.rooms, action.rooms]
                }
        case USERS_POSTS_STATE_CHANGE:
            return {
                ...state,
                usersFollowingLoaded: state.usersFollowingLoaded + 1,
                feed: [...state.feed, ...action.posts]
            }
        case USERS_LIKES_STATE_CHANGE:
            return {
                ...state,
                feed: state.feed.map(post => post.id === action.postId ?
                    { ...post, currentUserLike: action.currentUserLike } :
                    post)
            }
        case CLEAR_DATA:
            return initialState
        default:
            return state;
    }
}