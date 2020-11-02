import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

import logo from '../../assets/calc.svg'

const auth = firebase.auth()

export function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <>
      <button onClick={signInWithGoogle}>
        Sign in with Google
    </button>
      <img src={logo} alt='calculator' className='logo' />
    </>
  )
}

export function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}