import './GameControls.css';

function GameControls({ difficulty, onDifficultyChange, onNewGame, time }) {
    const difficulties = [
        { value: 'easy', label: '쉬움' },
        { value: 'medium', label: '보통' },
        { value: 'hard', label: '어려움' },
        { value: 'expert', label: '전문가' }
    ];

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="game-controls">
            <div className="timer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                </svg>
                <span>{formatTime(time)}</span>
            </div>

            <div className="difficulty-selector">
                {difficulties.map(({ value, label }) => (
                    <button
                        key={value}
                        className={`difficulty-btn ${difficulty === value ? 'active' : ''}`}
                        onClick={() => onDifficultyChange(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <button className="new-game-btn" onClick={onNewGame}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                새 게임
            </button>
        </div>
    );
}

export default GameControls;
