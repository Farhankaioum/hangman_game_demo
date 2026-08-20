import React from 'react';

interface TopbarProps {
    gameId?: number;
    loading: boolean;
    onRefresh: () => void;
    onCreateNew: () => void;
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const Topbar: React.FC<TopbarProps> = ({ gameId, loading, onRefresh, onCreateNew }) => {
    return (
        <header className="topbar">
            <div className="brand">
                <div className="brand-mark">H</div>
                <div>
                    <h1>Audacix <span>Hangman</span></h1>
                </div>
            </div>
            <div className="topbar-actions">
                <div className="api-badge">
                    <span className="dot" />
                    API: {API_BASE}
                </div>
                <button className="btn btn-secondary" onClick={onRefresh} disabled={!gameId || loading}>
                    ↻ Refresh
                </button>
                <button className="btn btn-primary" onClick={onCreateNew} disabled={loading}>
                    + New Game
                </button>
            </div>
        </header>
    );
};