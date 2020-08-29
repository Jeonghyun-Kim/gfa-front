/* eslint-disable @typescript-eslint/no-explicit-any */
import { withIronSession } from 'next-iron-session';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function withSession(handler: any): (...args: any[]) => any {
  if (process.env.SECRET_COOKIE_PASSWORD) {
    return withIronSession(handler, {
      password: process.env.SECRET_COOKIE_PASSWORD,
      cookieName: 'ondisplay-session',
      cookieOptions: {
        // secure: process.env.NODE_ENV === 'production',
        secure: false,
      },
    });
  }
  throw new Error('NULL ENV');
}
