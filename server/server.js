const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());    
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send("HELLO");
});

app.post('/api/process', upload.single('file'), (req, res) => {
  const { file } = req;
  const { prompt } = req.body;

  if (!file || !prompt) {
    return res.status(400).json({ error: 'File and prompt are required' });
  }

  console.log('Received file:', file.originalname);
  console.log('Prompt:', prompt);

//   const pythonProcess = spawn('python', ['ai_model.py', file.path, prompt]);
  const pythonProcess = spawn('python', ['ai_model.py', "name"]);
  pythonProcess.stdout.on('data', (data)=>{
    console.log(`stdout: ${data}`);
  })
//   fs.unlink(file.path, (err) => {
//           if (err) {
//             console.error(`Error deleting file: ${err}`);
//           }
//         });
  let result = '';
  let errorOutput = '';

//   pythonProcess.stdout.on('data', (data) => {
//     result += data.toString();
//   });

//   pythonProcess.stderr.on('data', (data) => {
//     errorOutput += data.toString();
//     console.error(`Python script error: ${data}`);
//   });

//   pythonProcess.on('close', (code) => {
//     // Clean up the uploaded file after processing
//     fs.unlink(file.path, (err) => {
//       if (err) {
//         console.error(`Error deleting file: ${err}`);
//       }
//     });
  
//     if (code !== 0) {
//       console.error(`Python process exited with code: ${code}`);
//       return res.status(500).json({ 
//         error: 'An error occurred while processing the file',
//         details: errorOutput
//       });
//     }
  
//     try {
//       const jsonResult = JSON.parse(result);
//       res.json(jsonResult);
//     } catch (e) {
//       console.error('Error parsing result:', e);
//       res.status(500).json({ 
//         error: 'Error parsing result from Python script',
//         details: result
//       });
//     }
//   });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});