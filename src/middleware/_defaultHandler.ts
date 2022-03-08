import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

// This middleware function will run between every request and api handler
const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    res.status(501).json({ error: `Something went wrong! ${err.message}` });
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

export default handler;
