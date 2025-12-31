import './WinModal.css';

const difficultyLabels = {
    easy: '쉬움',
    medium: '보통',
    hard: '어려움',
    expert: '전문가'
};

function WinModal({ time, difficulty, isNewHighScore, highScore, onNewGame, onClose }) {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}분 ${secs}초`;
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="confetti">{isNewHighScore ? '🏆' : '🎉'}</div>
                <h2>{isNewHighScore ? '새로운 기록!' : '축하합니다!'}</h2>
                <p className="win-message">
                    {difficultyLabels[difficulty]} 난이도 스도쿠를 완성했습니다!
                </p>
                <p className="win-time">완료 시간: {formatTime(time)}</p>

                {isNewHighScore && (
                    <div className="new-record-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        최고 기록 갱신!
                    </div>
                )}

                {!isNewHighScore && highScore && (
                    <p className="high-score-info">
                        최고 기록: {formatTime(highScore)}
                    </p>
                )}

                <button className="play-again-btn" onClick={onNewGame}>
                    다시 플레이
                </button>
            </div>
        </div>
    );
}

export default WinModal;
