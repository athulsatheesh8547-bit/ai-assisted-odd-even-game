
function Result({ winner, firstBatter, secondBatter, firstScore, secondScore, onRestart, onHistory }) {
    return (
        <section className="panel">
            <h1>🏆 MATCH OVER</h1>

            <h2>{winner} WON THE MATCH!</h2>

            <div className="final-score">
                <p>{firstBatter}: {firstScore} runs</p>
                <p>{secondBatter}: {secondScore} runs</p>
            </div>

            <button onClick={onRestart}>
                PLAY AGAIN
            </button>

            <button className="secondary" onClick={onHistory}>
                MATCH HISTORY
            </button>
        </section>
    );
}

export default Result;
