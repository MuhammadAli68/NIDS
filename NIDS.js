 const { spawn } = require('child_process');
const express = require('express');
app = express();
const port = 5000;

app.get("/NIDS",(req,res)=>{
  index = Math.floor(
    Math.random() * (413484 - 1) + 1
  );
  let pythonOutput = '';
  const pythonProcess = spawn('python3',['childProcess.py',index]);

  pythonProcess.stdout.on('data', (data) => {
     console.log(`stdout: ${data}`);
     pythonOutput += data.toString();
   });
   
  pythonProcess.stderr.on('data', (data) => {
     console.error(`stderr: ${data}`);
   });
   
  pythonProcess.on('close', (code) => {
    if(code === 0)
    {
      console.log(`child process exited with code ${code}`);
      res.json(JSON.parse(pythonOutput));
    }
    else
    {
      console.error('Python script execution failed with code', code);
    }
   });
});

app.listen(port,function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});