const express = require('express');

const app = express();

app.listen(3000).on('error', (error) => {console.log(error)}).on('listening', () => {console.log('Success')})