import {useMutation,useQueryClient} from 'react-query'
import firestore from '@react-native-firebase/firestore';


const addFirestoreData=async(data,FirstCollection,firstdoc,IsSecCollection,SecCollection,secdoc,IsUpdated)=>{
    let collectionRef;
    if(IsSecCollection)
    {
     if(secdoc&&!IsUpdated)
     {
         collectionRef=await firestore().collection(FirstCollection).doc(firstdoc).collection(SecCollection).doc(secdoc).set(data);
     }
    }
    else if(IsUpdated&&!secdoc)
    {
        collectionRef=await firestore().collection(FirstCollection).doc(firstdoc).update(data);
    }
    else if(IsUpdated&&secdoc)
    {
        collectionRef=await firestore().collection(FirstCollection).doc(firstdoc).collection(SecCollection).doc(secdoc).update(data)
    }
    else 
    {
         collectionRef=await firestore().collection(FirstCollection).add(data)
    }
 }

function useFirestoreMutation(collectionPath)
{
    const queryClient=useQueryClient()
    return useMutation(()=>addFirestoreData(data,FirstCollection,firstdoc,IsSecCollection,SecCollection,secdoc,IsUpdated),{
        onMutate:async(data)=>{
            await queryClient.cancelQueries(collectionPath)
            const previousData=queryClient.getQueryData(collectionPath)
            queryClient.setQueryData(collectionPath,old=>[...old,data])
            return {previousData}
        },
        onError:(error,variables,context)=>{
            queryClient.setQueryData(collectionPath,context.previousData)
        },
        onSettled:()=>{
            queryClient.invalidateQueries(collectionPath)
        }
    })
}
export default useFirestoreMutation;