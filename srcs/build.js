import { exec, spawn } from "child_process";
import path from "path";

export function buildProject(id) {
    return new Promise((resolve) => {
       
        

        const currentModulePath=import.meta.url; 
        const outputPath = path.join(new URL('.', currentModulePath).pathname.slice(1), `output/${id}`);
        const child = exec(`cd ${outputPath} && npm install && npm run build`)

        child.stdout?.on('data', function(data) {
            console.log('stdout: ' + data);
        });
        child.stderr?.on('data', function(data) {
            console.log('stderr: ' + data);
        });

        child.on('close', function(code) {
           resolve("")
        });

    })

}