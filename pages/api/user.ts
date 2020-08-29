import { NextApiRequest, NextApiResponse } from 'next';
import * as uuid from 'uuid';

import withSession from '../../lib/session';

interface RequestWithSession extends NextApiRequest {
  session: any;
}

export default withSession(
  async (req: RequestWithSession, res: NextApiResponse) => {
    const session = req.session.get('session');
    if (session && session.userId) {
      return res.json({ userId: session.userId, createdAt: session.createdAt });
    }
    const userId = uuid.v4();
    const createdAt = Date.now();
    req.session.set('session', {
      userId,
      createdAt,
    });
    await req.session.save();
    return res.json({ userId, createdAt });
  },
);
