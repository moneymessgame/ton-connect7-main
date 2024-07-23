import { NextRequest, NextResponse } from 'next/server';

import { updateBalance } from '@/lib/balance';
import prisma from '@/lib/prisma';
import { serializeUser } from '@/lib/serializeUser';
import withMiddleware from '@/utils/withMiddleware';


export async function PATCH (req: NextRequest, context: { params: any }) {

    const userId = context.params.user;

    console.log(userId)
}