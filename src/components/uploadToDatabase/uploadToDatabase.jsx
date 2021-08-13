//libararies
import React from 'react';

//styles
import './uploadToDatabase.scss'

//firebase
import { firestore } from '../../firebase/firebase';
const UploadToDatabase=({filename,image})=>{
    console.log(filename)
    console.log(image)
    const onsubmit= async (e)=>{
        e.preventDefault()
        firestore.collection('posts').doc(filename).set({
         filename:filename,
         postImage:image
      
       })
       
      } 
   return( 
       
   <div className='uploadPopUp'>
       <div className='imageDiv'>
        <img className='postImage'  src={image}></img>
       </div>
       
       <div className='formUploader'>
       <form   onSubmit={onsubmit}>
            <button className='button'>Upload</button>    
            <button className='button'>Cancel</button>
        </form>
       </div>
      
           
    </div>)
}
export default UploadToDatabase
