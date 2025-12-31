import './NumberPad.css';

function NumberPad({ onNumberSelect, onErase, disabled }) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="number-pad">
            <div className="numbers">
                {numbers.map(num => (
                    <button
                        key={num}
                        className="number-btn"
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
