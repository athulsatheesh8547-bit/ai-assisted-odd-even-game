
function Toss({ player1, tossChoice, setTossChoice, tossStep, onSelectNumber }) {
    return (
        <section className="panel">
            <h2>ODD OR EVEN TOSS</h2>
            <p>{player1}, choose Odd or Even</p>

            <div className="buttons">
                <button
                    disabled={!!tossChoice}
                    onClick={() => setTossChoice('Odd')}
                >
                    ODD
                </button>

                <button
                    disabled={!!tossChoice}
                    onClick={() => setTossChoice('Even')}
                >
                    EVEN
                </button>
            </div>

            {tossChoice && (
                <>
                    <h3>
                        {tossStep === 1
                            ? `${player1}, choose a number`
                            : 'Player 2, choose a number'}
                    </h3>

                    <div className="number-grid">
                        {[1, 2, 3, 4, 5, 6].map(number => (
                            <button
                                key={number}
                                onClick={() => onSelectNumber(number)}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

export default Toss;
