import React from 'react';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface KeyboardProps {
    guessedLetters: string[];
    loading: boolean;
    onGuess: (letter: string) => void;
}

export const Keyboard: React.FC<KeyboardProps> = ({ guessedLetters, loading, onGuess }) => {
    return (
        <div className="keyboard-wrap">
            <span className="label">Quick guess</span>
            <div className="keyboard">
                {LETTERS.map(letter => {
                    const lower = letter.toLowerCase();
                    const used = guessedLetters.includes(lower);
                    return (
                        <button
                            key={letter}
                            className={`key ${used ? 'used' : ''}`}
                            disabled={loading || used}
                            onClick={() => onGuess(lower)}
                        >
                            {letter}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};