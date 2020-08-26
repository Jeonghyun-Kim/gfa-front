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
      return res.json({ userId: session.userId });
    }
    const userId = uuid.v4();
    req.session.set('session', {
      userId,
      createdAt: Date.now(),
    });
    await req.session.save();
    return res.json({ userId });
  },
);
