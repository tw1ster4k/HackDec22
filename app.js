const express = require('express');
// test comment
const app = express();

app.listen(3000).on('error', (error) => {console.log(error)}).on('listening', () => {console.log('Success')})