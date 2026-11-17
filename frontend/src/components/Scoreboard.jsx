
function Scoreboard({
    firstBatter,
    secondBatter,
    firstScore,
    secondScore,
    innings,
    target
}) {
    return (
        <div className="scoreboard">
            <h2>INNINGS {innings}</h2>

            <h1>
                {innings === 1 ? firstScore : secondScore}
            </h1>

            <p>
                {firstBatter}: {firstScore} runs
            </p>

            <p>
                {secondBatter}: {secondScore} runs
            </p>

            {innings === 2 && (
                <h3>
                    Target: {target} | Need: {Math.max(0, target - secondScore)}
                </h3>
            )}
        </div>
    );
}

export default Scoreboard;
