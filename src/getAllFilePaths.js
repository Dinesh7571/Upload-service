import fs from'fs';
import path from'path';

export const getAllFilesPaths = (folderPath) => {
    let response = [];
    const allFilesAndFolders = fs.readdirSync(folderPath);

    allFilesAndFolders.forEach(file => {
        const fullFilePath = path.join(folderPath, file);

        if (fs.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFilesPaths(fullFilePath));
        } else {
            response.push(fullFilePath);
        }
    });

    return response;
};
