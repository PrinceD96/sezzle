import React from 'react'
import { firestore } from '../../config/Firebase'

import { useCollectionData } from 'react-firebase-hooks/firestore'

export default function Calculations() {
  const calculationsRef = firestore.collection('calculations')
  const query = calculationsRef.orderBy('createdAt', 'desc').limit(10)

  const [calculations] = useCollectionData(query, { idField: 'id' })

  return (
    <div>
      {calculations && calculations.map(({ calc }, index) => (
        <p key={index}>{calc}</p>
      ))}
    </div>
  )
}
