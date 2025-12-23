import { Otp } from './user-otp.entity';

describe('User OTP Entity', () => {
  it('Should be able to create a valid OTP Code', () => {
    const otp = new Otp('12345');

    expect(otp).toBeDefined();
    expect(otp.expiresIn.getTime()).toBeGreaterThan(Date.now());
  });

  it('Should not be able to create a OTP with less than 5 characters!', () => {
    expect(() => {
      new Otp('123');
    }).toThrow();
  });
});
