import { Otp } from './costumer-otp.entity';

describe('Costumer Authentication OTP Code', () => {
  it('Should be able to create a valid OTP Code', () => {
    const otp = new Otp({ code: '12345' });

    expect(otp).toBeDefined();
    expect(otp.expiresIn.getTime()).toBeGreaterThan(Date.now());
  });

  it('Should not be able to create a OTP with less than 5 characters!', () => {
    expect(() => {
      new Otp({ code: '1234' });
    }).toThrow();
  });
});
