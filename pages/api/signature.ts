import { NextApiRequest, NextApiResponse } from 'next';
import * as uuid from 'uuid';

import fetcher from '../../lib/fetcher';
import withSession from '../../lib/session';

import { API_URL } from '../../defines';

interface RequestWithSession extends NextApiRequest {
  session: any;
}

export default withSession(
  async (req: RequestWithSession, res: NextApiResponse) => {
    const session = req.session.get('session');
    if (session && session.userId) {
      const { error } = await fetcher(`${API_URL}/signature`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: session.userId, ...req.body }),
      });
      return res.json({ error });
    }
    console.error('NO USERID');
    const userId = uuid.v4();
    const { error } = await fetcher(`${API_URL}/signature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, ...req.body }),
    });
    req.session.set('session', {
      userId,
      createdAt: Date.now(),
    });
    await req.session.save();
    return res.json({ error });
  },
);
