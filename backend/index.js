const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/bfhl', (req, res) => {
  try {
    const { data, file_b64 } = req.body;

    if (!Array.isArray(data)) {
      throw new Error('Invalid input: data must be an array');
    }

    const numbers = data.filter(item => /^\d+$/.test(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    const highestLowercase = alphabets
      .filter(char => char === char.toLowerCase())
      .sort((a, b) => b.localeCompare(a))[0];

    const response = {
      is_success: true,
      user_id: "munjulurianand_16102003",
      email: "mm3901@srmist.edu.in",
      roll_number: "RA2011003010001",
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    };

    if (file_b64) {
      try {
        const fileBuffer = Buffer.from(file_b64, 'base64');
        response.file_valid = true;
        response.file_mime_type = 'application/octet-stream'; 
        response.file_size_kb = (fileBuffer.length / 1024).toFixed(2);
      } catch (error) {
        response.file_valid = false;
      }
    } else {
      response.file_valid = false;
    }

    res.json(response);
  } catch (error) {
    res.status(400).json({ is_success: false, error: error.message });
  }
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});