import './NumberPad.css';

function NumberPad({ onNumberSelect, onErase, isNotesMode, onToggleNotesMode, disabled }) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="number-pad">
            <div className="mode-toggle">
                <button
                    className={`mode-btn ${!isNotesMode ? 'active' : ''}`}
                    onClick={() => onToggleNotesMode(false)}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    입력
                </button>
                <button
                    className={`mode-btn ${isNotesMode ? 'active' : ''}`}
                    onClick={() => onToggleNotesMode(true)}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    메모
                </button>
            </div>

            <div className="numbers">
                {numbers.map(num => (
                    <button
                        key={num}
                        className={`number-btn ${isNotesMode ? 'notes-mode' : ''}`}
                        onClick={() => onNumberSelect(num)}
                        disabled={disabled}
                    >
                        {num}
                    </button>
                ))}
            </div>
            <button
                className="erase-btn"
                onClick={onErase}
                disabled={disabled}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 7l-7 7m0 0l-7 7m7-7l7 7m-7-7l-7-7" strokeLinecap="round" strokeLinejoin="round" transform="rotate(45 12 12)" />
                </svg>
                지우기
            </button>
        </div>
    );
}

export default NumberPad;
