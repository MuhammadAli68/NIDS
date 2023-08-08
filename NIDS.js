//  const { spawn } = require('child_process');

//  const pythonProcess = spawn('python',['childProcess.py']);

//  pythonProcess.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
//   });
  
//  pythonProcess.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
//   });
  
//  pythonProcess.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
//   });

const fs = require("fs");
const { parse } = require("csv-parse");

fs.createReadStream("C:/Users/M.Ali/Downloads/dataframe.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    console.log(row);
  })