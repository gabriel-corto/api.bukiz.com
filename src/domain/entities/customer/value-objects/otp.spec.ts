import { Otp } from './otp';

describe('Customer Authentication OTP Code', () => {
  it('Should be able to create a valid OTP Code', () => {
    const otp = Otp.create('12345');

    expect(otp).toBeDefined();
    expect(otp.expiresIn.getTime()).toBeGreaterThan(Date.now());
  });

  it('Should not be able to create a OTP with less than 5 characters!', () => {
    expect(() => {
      Otp.create('1234');
    }).toThrow();
  });
});
