import React, { useMemo } from 'react';
import type { GameState } from '../../types';
import { LetterBox } from './LetterBox';
import { StatusBadge } from './StatusBadge';
import { Keyboard } from './Keyboard';

interface GameCardProps {
    game: GameState | null;
    guess: string;
    message: string;
    loading: boolean;
    guessedLetters: string[];
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onGuess: (letter: string) => void;
    onCreateNew: () => void;
    onRefresh: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({
    game,
    guess,
    message,
    loading,
    guessedLetters,
    onInputChange,
    onFormSubmit,
    onGuess,
    onCreateNew,
    onRefresh
}) => {
    const statusClass = useMemo(() => {
        if (!game) return '';
        if (game.state === 'Won') return 'won';
        if (game.state === 'Lost') return 'lost';
        return '';
    }, [game]);

    const progressPct = useMemo(() => {
        if (!game) return 0;
        const total = game.incorrect_guesses + game.incorrect_guesses_remaining;
        return total > 0 ? Math.min(100, (game.incorrect_guesses / total) * 100) : 0;
    }, [game]);

    if (!game) {
        return (
            <div className="card game-card">
                <div className="empty-state">
                    <div className="icon">⌛</div>
                    <h3>Creating game...</h3>
                    <p>Connecting to Hangman API</p>
                </div>
            </div>
        );
    }

    const isInProgress = game.state === 'InProgress';

    return (
        <div className="card game-card">
            <div className="card-header">
                <div>
                    <span className="eyebrow">Current Game</span>
                    <h2>Play Hangman</h2>
                </div>
                <StatusBadge state={game.state} />
            </div>

            <div className="game-id">
                GAME ID <strong>#{game.id}</strong>
            </div>

            <div className="word-display">
                {game.word.split('').map((letter, index) => (
                    <LetterBox key={`${letter}-${index}`} letter={letter} />
                ))}
            </div>

            <div className="stats">
                <div className="stat-item">
                    <span>Incorrect</span>
                    <strong>{game.incorrect_guesses}</strong>
                </div>
                <div className="stat-item">
                    <span>Remaining</span>
                    <strong>{game.incorrect_guesses_remaining}</strong>
                </div>
                <div className="stat-item">
                    <span>Status</span>
                    <strong>{game.state}</strong>
                </div>
            </div>

            <div className="progress-wrap">
                <div className="progress-label">
                    <span>Attempts used</span>
                    <span>{game.incorrect_guesses} / {game.incorrect_guesses + game.incorrect_guesses_remaining}</span>
                </div>
                <div className="progress-track">
                    <div className={`progress-fill ${statusClass}`} style={{ width: `${progressPct}%` }} />
                </div>
            </div>

            {isInProgress ? (
                <>
                    <form className="guess-form" onSubmit={onFormSubmit}>
                        <input
                            type="text"
                            value={guess}
                            onChange={onInputChange}
                            placeholder="A"
                            maxLength={1}
                            autoComplete="off"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading || !/^[A-Z]$/.test(guess)}
                        >
                            Guess
                        </button>
                    </form>

                    {message && (
                        <div className={`message ${message.startsWith('✓') ? 'success' : message.startsWith('✗') ? 'error' : 'info'}`}>
                            {message}
                        </div>
                    )}

                    <Keyboard guessedLetters={guessedLetters} loading={loading} onGuess={onGuess} />
                </>
            ) : (
                <div className="game-result">
                    <div className="icon">{game.state === 'Won' ? '🎉' : '💥'}</div>
                    <h3>{game.state === 'Won' ? 'You won!' : 'Game over'}</h3>
                    <p>{game.state === 'Won' ? 'Excellent! You guessed the word.' : 'You used all available incorrect guesses.'}</p>
                    <button className="btn btn-primary" onClick={onCreateNew} disabled={loading}>
                        Play New Game
                    </button>
                </div>
            )}

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" onClick={onRefresh} disabled={!game || loading}>
                    ↻ Refresh
                </button>
                <button className="btn btn-primary" onClick={onCreateNew} disabled={loading}>
                    + New Game
                </button>
            </div>
        </div>
    );
};