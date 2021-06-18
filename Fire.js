import firebase from 'firebase'
import '@firebase/firestore'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



class Fire {
 
    constructor(callback) {
        this.init(callback)
    }

    init(callback) {
        auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user)
            } else
            {
                auth().signInAnonymously().catch(error => {
                    callback(error)
                })
            }
        })
    }

    getLists(callback) {
        let ref = this.ref

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = []

            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()})
            })

            callback(lists)
        })
    }

    addList(list) {
        let ref = this.ref
        ref.add(list)
    }

    updateList(list) {
        let ref = this.ref
        ref.doc(list.id).update(list)
    }

    deleteList(list) {
        let ref = this.ref
        ref.doc(list.id).delete(list)
    }

    get UserID() {
        return auth().currentUser.uid
    }
    get ref(){
        return firestore()
        .collection("users")
        .doc("menyP2UxdtkMckZygjp6")
        .collection("lists")
    }


    



}

export default Fire