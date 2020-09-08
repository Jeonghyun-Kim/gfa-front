import { NextApiRequest, NextApiResponse } from 'next';
import * as uuid from 'uuid';

import withSession from '../../lib/session';

import { API_URL } from '../../defines';

interface RequestWithSession extends NextApiRequest {
  session: any;
}

export default withSession(
  async (req: RequestWithSession, res: NextApiResponse) => {
    const session = req.session.get('session');
    const { href, deviceInfo } = req.body ?? {
      href: '/',
      deviceInfo: 'UNDEFINED',
    };
    if (session && session.userId) {
      fetch(`${API_URL}/counter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.userId,
          path: href,
          deviceInfo,
        }),
      });
      return res.json({ userId: session.userId });
    }
    const userId = uuid.v4();
    fetch(`${API_URL}/counter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, path: href, deviceInfo }),
    });
    req.session.set('session', {
      userId,
      createdAt: Date.now(),
    });
    await req.session.save();
    return res.json({ userId });
  },
);
