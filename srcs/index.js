import express from'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import generateId from'./idGenerate.js';
import simpleGit from 'simple-git';
import { getAllFilesPaths } from './getAllFilePaths.js';
import { storage } from './firebase.js';

import { buildProject } from './build.js';
import { uploadImageToFirebaseStorage } from './fileUpload.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
//import {fs} from 'fs';
const app= express();
app.use(cors())
app.use(express.json());

app.post('/deploy',async(req,res)=>{
    const repoUrl=req.body.repoUrl;
    const id=generateId();
    await simpleGit().clone(repoUrl,`output/${id}`);
    await buildProject(id);

  // const currentModulePath = import.meta.url;
   //const buildDistPath = path.join(new URL('.', currentModulePath).pathname.slice(1), `output/${id}/dist`);
  
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = dirname(__filename);

   const git = simpleGit({
    baseDir: __dirname,
   // binary: '/path/to/git', // Specify the path to the git executable if necessary
  });

   const buildDistPath = path.join(__dirname, `/output/${id}/dist`);
   //const buildDistPath = path.join(`/output/${id}/dist`);
   console.log(buildDistPath);


   const filesPath = await getAllFilesPaths(buildDistPath);
   const storagePathInFirebase = `build/${id}`; // Replace with the desired storage path
   
   await Promise.all(filesPath.map(async (file) => {
   const relativePath = path.relative(buildDistPath, file);
   const destination = `${storagePathInFirebase}/${relativePath.replace(/\\/g, '/')}`;
     
     await uploadImageToFirebaseStorage(file, destination);
   }));
   
   res.json({
        id:id,
       
    })
});


app.get('/test',async(req,res)=>{

res.send("working upload service")
 
    
 });







app.listen(3000,()=>{
    console.log("server is running on port:3000")
});