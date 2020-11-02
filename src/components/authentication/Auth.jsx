import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import logo from '../../assets/calc.svg'

const auth = firebase.auth()

export function SignIn() {

  const signInAnonymously = async () => {
    try {
      await auth.signInAnonymously()
    } catch (error) {
      console.error({error})
    }
  }

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      margin: theme.spacing(2),
      width: '70%',
      borderRadius: 20
    },
  }),
);

  const classes = useStyles();

  return (
    <div className='landing__page'>
      <div className='left'>
        <h1 className='title'>Sezzle Calculator</h1>
        <h4 className='subtitle'>Do basic arithmetic calculations</h4>
        <p className='body'>See the 10 most recent calculations across users.</p>
        <Button
        onClick={signInAnonymously}
        variant='contained'
        color="primary"
        className={classes.button}
        startIcon={<FontAwesomeIcon icon={faSignInAlt}/>}
      >
        Sign in as a guest
      </Button>
        <Button
        onClick={signInWithGoogle}
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<FontAwesomeIcon icon={faGoogle}/>}
      >
        Sign in with Google
      </Button>
      </div>

      <div className='right'>
        
        <img src={logo} alt='calculator' className='illustration' />
      </div>
    </div>
  )
}

export function SignOut() {

  const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      margin: theme.spacing(2),
      width: '250px',
      borderRadius: 20
    },
  }),
);

const classes = useStyles();

  return auth.currentUser && (
    <Button
    onClick={() => auth.signOut()}
    variant="contained"
    color='primary'
    className={classes.button}
    startIcon={<FontAwesomeIcon icon={faSignOutAlt}/>}
  >
    Sign Out
  </Button>
  )
}