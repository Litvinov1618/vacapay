import firebase from 'firebase/app'
import firebaseConfig from './firebaseConfig'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore().collection('employees')

export default db
