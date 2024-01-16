import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from './userSlice'

import { useAppSelector, useAppDispatch } from '../../app/hooks'

export const UserView = () => {
    const user = useAppSelector((state) => (state.user))
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])
    // want effect to run only on component mount so use empty array as dependancy
    return (
        <div>
            <h2>List of Users</h2>
            {user.loading && <div>Loading...</div>}
            {!user.loading && user.error ? <div>Error: {user.error}</div>: null}
            {!user.loading && user.users.length ? (
                <ul>
                    {
                        user.users.map(user => (
                            <li key={user.id}>{user.name}</li>
                        ))
                    }
                </ul>
            ) : null}
        </div>
    )
}

// get hold of state from userSlice and render appropriate jsx, 
//to select state from redux store, need useSelector hook
// import useSelector, all useSelector in componenet and for selector function select the userState