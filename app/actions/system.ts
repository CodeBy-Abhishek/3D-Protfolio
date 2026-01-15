'use server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execPromise = promisify(exec);

export async function getSystemHealth() {
    try {
        // Get the absolute path to health.py
        const scriptPath = path.join(process.cwd(), 'health.py');

        // Execute the python script
        const { stdout } = await execPromise(`python "${scriptPath}"`);

        // Extract the JSON part (the script prints "Running System Diagnostics..." first)
        const lines = stdout.split('\n');
        const jsonLine = lines.find(line => line.trim().startsWith('{'));

        if (jsonLine) {
            // Find where the JSON starts and ends if there's other text
            const startIndex = stdout.indexOf('{');
            const endIndex = stdout.lastIndexOf('}') + 1;
            const jsonText = stdout.substring(startIndex, endIndex);
            return JSON.parse(jsonText);
        }

        throw new Error('Could not parse health metrics');
    } catch (error) {
        console.error('Health Check Error:', error);
        return {
            status: 'OFFLINE',
            error: 'Backend communication interface unreachable'
        };
    }
}
