import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import { config } from '~/config';

export function getHash(message: string, nonce: string): string {
  return Base64.stringify(hmacSHA512(sha256(nonce + message), config.CRYPTO_KEY));
}
