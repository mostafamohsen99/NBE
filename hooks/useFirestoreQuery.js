import React from 'react'
import {useQuery} from 'react-query'
import firestore from '@react-native-firebase/firestore';




function useFirestoreQuery(collectionPath,FirstCollection,firstdoc,IsWhere,WhereCollection,IsSecCollection,SecCollection,secdoc) {
    const fetchFirestoreData=async()=>{
        let collectionRef='';
        if(IsWhere)
        {
        collectionRef=await firestore().collection(FirstCollection).where(WhereCollection,'==',firstdoc).get();
        }
        else if(IsSecCollection)
        {
            if(secdoc)
            {
             collectionRef=await firestore().collection(FirstCollection).doc(firstdoc).collection(SecCollection).doc(secdoc).get()
            }
            else
            {
            collectionRef=await firestore().collection(FirstCollection).doc(firstdoc).collection(SecCollection).get()
            }
        }
        else
        {
        collectionRef=await firestore().collection(FirstCollection).doc(firstdoc).get();
        }
        return collectionRef
    }
    return useQuery(collectionPath,fetchFirestoreData)
}

export default useFirestoreQuery
