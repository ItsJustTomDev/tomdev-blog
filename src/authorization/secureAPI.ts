import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export const secureAPI = (handler: (req: NextApiRequest, res: NextApiResponse) => void) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });

    if (!token) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }

    return handler(req, res);
  };
}