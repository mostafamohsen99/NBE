import React from 'react'
import {useQuery} from 'react-query'
import storage from '@react-native-firebase/storage'

function useStorageQuery(fileName)
{
    const downloadImage=async()=>{
        const collectionRef=storage().ref(fileName+'.png').getDownloadURL()
        return collectionRef 
    }
    return useQuery(fileName,downloadImage);
}
export default useStorageQuery;