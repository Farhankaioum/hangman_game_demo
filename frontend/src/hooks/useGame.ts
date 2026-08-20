import { useState, useEffect, useCallback } from 'react';
import { hangmanApi } from '../api/hangmanApi';
import type { GameState, ApiActivity } from '../types';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function useGame() {
    const [game, setGame] = useState<GameState | null>(null);
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [lastResponse, setLastResponse] = useState<unknown>(null);
    const [activity, setActivity] = useState<ApiActivity[]>([]);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const addActivity = useCallback((method: string, endpoint: string, status: number | null, message: string) => {
        setActivity(prev => [{ method, endpoint, status, message }, ...prev].slice(0, 8));
    }, []);

    const createNewGame = useCallback(async () => {
        setLoading(true);
        setMessage('');
        setApiError('');
        setGuess('');
        setGuessedLetters([]);
        setLastResponse(null);

        try {
            const id = await hangmanApi.startGame();
            addActivity('POST', '/game/new', 201, `Game ${id} created`);

            const newGame = await hangmanApi.getGame(id);
            setGame(newGame);
            setLastResponse(newGame);
            addActivity('GET', `/game/${id}`, 200, 'Game state loaded');
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Something went wrong';
            setApiError(msg);
            addActivity('ERROR', '/game/new', null, msg);
        } finally {
            setLoading(false);
        }
    }, [addActivity]);

    const refreshGame = useCallback(async () => {
        if (!game) return;

        setLoading(true);
        setMessage('');
        setApiError('');

        try {
            const currentGame = await hangmanApi.getGame(game.id);
            setGame(currentGame);
            setLastResponse(currentGame);
            addActivity('GET', `/game/${game.id}`, 200, 'Game state refreshed');
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Could not refresh game';
            setApiError(msg);
            addActivity('GET', `/game/${game.id}`, null, msg);
        } finally {
            setLoading(false);
        }
    }, [game, addActivity]);

    const handleGuess = useCallback(async (value?: string) => {
        const letter = (value ?? guess).trim().toLowerCase();

        if (!game) return;
        if (game.state !== 'InProgress') {
            setMessage('The game has already ended. Start a new game.');
            return;
        }
        if (!/^[a-z]$/.test(letter)) {
            setMessage('Enter exactly one English letter.');
            return;
        }
        if (guessedLetters.includes(letter)) {
            setMessage(`You already guessed "${letter.toUpperCase()}".`);
            return;
        }

        setLoading(true);
        setMessage('');
        setApiError('');

        try {
            const result = await hangmanApi.submitGuess(game.id, letter);
            setGame(result);
            setLastResponse(result);
            setGuess('');
            setGuessedLetters(prev => [...prev, letter]);

            const isCorrect = result.correct;
            setMessage(
                isCorrect
                    ? `✓ "${letter.toUpperCase()}" is correct!`
                    : `✗ "${letter.toUpperCase()}" is incorrect.`
            );

            addActivity(
                'POST',
                `/game/${game.id}/guess`,
                200,
                `${isCorrect ? 'Correct' : 'Incorrect'} guess: ${letter.toUpperCase()}`
            );
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Could not submit guess';
            setApiError(msg);
            addActivity('POST', `/game/${game.id}/guess`, null, msg);
        } finally {
            setLoading(false);
        }
    }, [game, guess, guessedLetters, addActivity]);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 1).toUpperCase();
        setGuess(value);
    }, []);

    const handleFormSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        void handleGuess();
    }, [handleGuess]);

    useEffect(() => {
        void createNewGame();
    }, []);

    return {
        game,
        guess,
        message,
        loading,
        apiError,
        lastResponse,
        activity,
        guessedLetters,
        createNewGame,
        refreshGame,
        handleGuess,
        handleInputChange,
        handleFormSubmit,
        setMessage
    };
}