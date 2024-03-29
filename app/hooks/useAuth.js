// Hook (use-auth.js)
import axios from 'axios'
import React, { useState, useEffect, useContext, createContext } from 'react'
import { useLocalStorage } from './useLocalStorage'

const authContext = createContext()

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth ({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext)
}

// Provider hook that creates auth object and handles state
function useProvideAuth () {
  const [user, setUser] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [userLS, setUserLS] = useLocalStorage('user')
  // eslint-disable-next-line no-unused-vars
  const [_2, setLoginDateLS] = useLocalStorage('loginDate')

  console.log('user', user)

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async (email, password) => {
    const response = await axios.post('/api/login', { email, password })
    console.log('res', response)
    if (response.data) {
      setUserLS(email)
      setLoginDateLS(new Date())
      return 'OK'
    }
    return 'KO'
  }

  const signup = (email, password) => {}

  const signout = () => {
    setUserLS(null)
    setLoginDateLS(null)
  }

  const sendPasswordResetEmail = (email) => {}

  const confirmPasswordReset = (code, password) => {}

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    if (userLS) {
      setUser(userLS)
    } else {
      setUser(null)
    }

    // Cleanup subscription on unmount
  }, [userLS])

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset
  }
}
