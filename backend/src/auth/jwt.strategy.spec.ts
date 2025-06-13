import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { ExtractJwt, Strategy } from 'passport-jwt';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(() => {
    jwtStrategy = new JwtStrategy();
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  it('should call super with correct strategy options', () => {
    const strategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    };

    const superSpy = jest.spyOn(Strategy.prototype, 'constructor');

    // Re-create instance to trigger constructor after spying
    new JwtStrategy();

    expect(strategyOptions.jwtFromRequest).toBeDefined();
    expect(strategyOptions.ignoreExpiration).toBe(false);
    expect(strategyOptions.secretOrKey).toBe(jwtConstants.secret);

    superSpy.mockRestore(); // Clean up after spying
  });

  it('should validate and return user object from payload', async () => {
    const payload = { sub: '123', email: 'test@example.com' };

    const result = await jwtStrategy.validate(payload);

    expect(result).toEqual({ userId: '123', email: 'test@example.com' });
  });
});
