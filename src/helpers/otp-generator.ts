import { generate } from 'otp-generator';

export const generatedOtp = generate(5, {
  digits: true,
  lowerCaseAlphabets: false,
  upperCaseAlphabets: false,
  specialChars: false,
});
