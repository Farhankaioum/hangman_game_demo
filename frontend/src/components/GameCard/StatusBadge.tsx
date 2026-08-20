import React from 'react';
import type { GameStatus } from '../../types';

interface StatusBadgeProps {
    state: GameStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ state }) => {
    let className = 'status-badge';
    if (state === 'Won') className += ' won';
    else if (state === 'Lost') className += ' lost';

    return <span className={className}>{state}</span>;
};