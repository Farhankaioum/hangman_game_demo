import type { GameState, GuessResponse } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const hangmanApi = {
    async startGame(): Promise<number> {
        const response = await fetch(`${API_BASE}/game/new`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            throw new Error(`Failed to create game (${response.status})`);
        }

        const data = await response.json();
        if (!data.id) throw new Error('No game ID returned');
        return data.id;
    },

    async getGame(id: number): Promise<GameState> {
        const response = await fetch(`${API_BASE}/game/${id}`);
        if (!response.ok) {
            throw new Error(`Could not load game (${response.status})`);
        }
        return response.json();
    },

    async submitGuess(id: number, guess: string): Promise<GuessResponse> {
        const response = await fetch(`${API_BASE}/game/${id}/guess`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ guess })
        });

        const data = await response.json();
        if (!response.ok) {
            const msg = data?.guess?.[0] || data?.detail || 'Invalid guess';
            throw new Error(msg);
        }
        return data;
    }
};