import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input (Simulation)
        if (!body.email || !body.message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Simulate database insertion or email sending
        console.log('Receiving contact request:', body);

        return NextResponse.json({
            success: true,
            message: 'Message queued for delivery.',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
