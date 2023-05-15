const crypto = require('crypto');

const generateToken = () => {
  const length = 30;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  const currentDate = new Date().toISOString();
  const hash = crypto.createHash('sha256').update(currentDate).digest('hex');
  token += hash;

  return token;
}

module.exports = generateToken;
