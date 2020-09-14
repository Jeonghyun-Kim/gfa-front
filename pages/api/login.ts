import { NextApiRequest, NextApiResponse } from 'next';

import withSession from '../../lib/session';

interface RequestWithSession extends NextApiRequest {
  session: any;
}

const ID = 'admin';
const PASSWORD = '20200911';

export default withSession(
  async (req: RequestWithSession, res: NextApiResponse) => {
    const { id, password } = req.body;
    if (id !== ID) {
      return res.json({ error: '아이디가 틀립니다.' });
    }
    if (password !== PASSWORD) {
      return res.json({ error: '비밀번호가 틀립니다.' });
    }
    const signaturePassword = process.env.SIGNATURE_PASSWORD;
    return res.json({ signaturePassword });
  },
);
