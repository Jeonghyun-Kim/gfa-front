import { withIronSession } from 'next-iron-session';

export default function withSession(handler: any) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD!,
    cookieName: 'ondisplay-session',
    cookieOptions: {
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
    },
  });
}
