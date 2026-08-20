import React from 'react';

interface LetterBoxProps {
    letter: string;
}

export const LetterBox: React.FC<LetterBoxProps> = ({ letter }) => {
    return (
        <span className="letter-box">
            {letter === '_' ? '' : letter.toUpperCase()}
        </span>
    );
};