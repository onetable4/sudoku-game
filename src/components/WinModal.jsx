import './WinModal.css';

function WinModal({ time, onNewGame, onClose }) {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}분 ${secs}초`;
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="confetti">🎉</div>
                <h2>축하합니다!</h2>
                <p className="win-message">스도쿠를 완성했습니다!</p>
                <p className="win-time">완료 시간: {formatTime(time)}</p>
                <button className="play-again-btn" onClick={onNewGame}>
                    다시 플레이
                </button>
            </div>
        </div>
    );
}

export default WinModal;
