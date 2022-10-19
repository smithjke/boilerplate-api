import dotenv from 'dotenv';

dotenv.config();

if (!process.env.CRYPTO_KEY) {
  throw new Error('Need CRYPTO_KEY');
}

export const config = {
  PORT: process.env.PORT || 3000,
  CRYPTO_KEY: process.env.CRYPTO_KEY,
};
