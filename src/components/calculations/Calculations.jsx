import React from 'react'
import { firestore, auth } from '../../config/Firebase'
import DeleteIcon from '@material-ui/icons/Delete';

import { useCollectionData } from 'react-firebase-hooks/firestore'

export default function Calculations() {
  const calculationsRef = firestore.collection('calculations')
  const query = calculationsRef.orderBy('createdAt', 'desc').limit(10)

  const [calculations] = useCollectionData(query, { idField: 'id' })
  const { uid } = auth.currentUser

  const deleteCalculation = id => {
    try {
      calculationsRef.doc(id).delete()
    } catch (error) {
      console.error({ error })
    }
  }

  return (
    <div>
      {calculations && calculations.map(({ calc, user, id }, index) => (
        <p key={index} className={`calculations ${user === uid ? 'own' : ''}`}>{calc} {user === uid && <span onClick={() => deleteCalculation(id)}><DeleteIcon color='action' /></span>}</p>
      ))}

    </div>
  )
}
