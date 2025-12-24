export const generateOTP = (
  length: number = 6,
  options?: { useLetters?: boolean; useSymbols?: boolean },
): string => {
  const digits = '0123456789';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const symbols = '!@#$%^&*()';

  let dictionary = digits;
  if (options?.useLetters) dictionary += letters;
  if (options?.useSymbols) dictionary += symbols;

  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    otp += dictionary[randomIndex];
  }

  return otp;
};

export const generateUniqueOTP = (
  existingOTPs: string[],
  length: number = 6,
): string => {
  let newOTP = generateOTP(length);
  let attempts = 0;

  while (existingOTPs.includes(newOTP) && attempts < 10) {
    newOTP = generateOTP(length);
    attempts++;
  }

  if (attempts === 10) {
    console.warn(
      'Aviso: Alta densidade de colisões de OTP. Considere aumentar o tamanho do OTP.',
    );
  }

  return newOTP;
};
