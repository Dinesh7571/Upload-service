// import { storage } from './firebase';
// import {ref,uploadBytes} from 'firebase/storage'

// export function uploadFile(filePath){
    
//     const fileBucket = storage.bucket().file(`your_storage_path/${path.basename(filePath)}`);
  
//     fileBucket.createWriteStream()
//       .on('error', (error) => {
//         console.error(`Error uploading ${filePath}:`, error);
//       })
//       .on('finish', () => {
//         console.log(`${filePath} uploaded successfully.`);
//       })
//       .end(require('fs').readFileSync(filePath));


// }


import admin from 'firebase-admin'
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

import path from 'path';



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://deployment-server-a0601.appspot.com'
  });


const bucket = admin.storage().bucket();

export const uploadImageToFirebaseStorage = async (localFilePath, storagePath) => {
  try {
    const fileName = path.basename(localFilePath);
    const destination = `${storagePath}`;
  //  `dist/${id}/` + file.slice(folderPath.length + 1)
  //const destination = `${storagePath}`;
    await bucket.upload(localFilePath, { destination });

    console.log('Image uploaded successfully!');
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};
  