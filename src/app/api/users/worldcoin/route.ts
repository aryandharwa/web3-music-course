import { type IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const proof = req.body;
    const app_id = process.env.APP_ID as `app_${string}`;
    const action = process.env.ACTION_ID as string;

    // Verify proof with Worldcoin API
    const verifyRes = (await verifyCloudProof(proof, app_id!, action!)) as IVerifyResponse;

    if (verifyRes.success) {
      // Optional: Add custom logic for successful verification, like saving verification status to a database
      res.status(200).json({ success: true, message: 'Verification successful', data: verifyRes });
    } else {
      res.status(400).json({ success: false, message: 'Verification failed', data: verifyRes });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ success: false, message: 'Server error during verification' });
  }
}
