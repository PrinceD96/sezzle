import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const firestore = firebase.firestore()

export default function Calculations() {
  const calculationsRef = firestore.collection('calculations')
  const query = calculationsRef.orderBy('createdAt').limit(10)

  const [calculations] = useCollectionData(query, { idField: 'id' })

  return (
    <div>
      {calculations && calculations.map(({ calc }) => (
        <p>{calc}</p>
      ))}
    </div>
  )
}
