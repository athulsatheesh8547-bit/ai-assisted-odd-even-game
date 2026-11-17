
import { useState } from 'react';
import axios from 'axios';
import './App.css';

import Toss from './components/Toss';
import GameBoard from './components/GameBoard';
import Scoreboard from './components/Scoreboard';
import Result from './components/Result';

const API = 'http://localhost:5000/api/games';

function App() {
    const [screen, setScreen] = useState('setup');

    // Player details
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');

    // Toss details
    const [tossChoice, setTossChoice] = useState('');
    const [tossP1, setTossP1] = useState('');
    const [tossP2, setTossP2] = useState('');
    const [tossStep, setTossStep] = useState(1);
    const [tossWinner, setTossWinner] = useState('');

    // Batting and bowling details
    const [firstBatter, setFirstBatter] = useState('');
    const [secondBatter, setSecondBatter] = useState('');
    const [currentBatter, setCurrentBatter] = useState('');

    // Scores
    const [firstScore, setFirstScore] = useState(0);
    const [secondScore, setSecondScore] = useState(0);

    const [target, setTarget] = useState(0);
    const [innings, setInnings] = useState(1);

    // Game controls
    const [batNumber, setBatNumber] = useState(null);
    const [gameStep, setGameStep] = useState('bat');

    const [message, setMessage] = useState('');
    const [winner, setWinner] = useState('');
    const [history, setHistory] = useState([]);

    // Get the other player
    const otherPlayer = (player) =>
        player === player1 ? player2 : player1;

    // START GAME
    const startGame = () => {
        if (!player1.trim() || !player2.trim()) {
            alert('Enter both player names');
            return;
        }

        if (
            player1.trim().toLowerCase() ===
            player2.trim().toLowerCase()
        ) {
            alert('Enter two different player names');
            return;
        }

        setPlayer1(player1.trim());
        setPlayer2(player2.trim());

        setScreen('toss');
    };

    // TOSS NUMBER SELECTION
    const selectTossNumber = (number) => {
        if (tossStep === 1) {
            setTossP1(number);
            setTossStep(2);
        } else {
            setTossP2(number);

            const sum = Number(tossP1) + number;
            const result = sum % 2 === 0 ? 'Even' : 'Odd';

            const tossWinnerName =
                result === tossChoice ? player1 : player2;

            setTossWinner(tossWinnerName);
            setScreen('tossResult');
        }
    };

    // CHOOSE BATTING OR BOWLING
    const chooseRole = (role) => {
        const batter =
            role === 'Batting'
                ? tossWinner
                : otherPlayer(tossWinner);

        const bowler = otherPlayer(batter);

        setFirstBatter(batter);
        setSecondBatter(bowler);
        setCurrentBatter(batter);

        setScreen('game');
    };

    // NUMBER SELECTION
    const selectNumber = (number) => {
        if (gameStep === 'bat') {
            setBatNumber(number);
            setGameStep('bowl');
        } else {
            playRound(number);
        }
    };

    // GAME ROUND LOGIC
    const playRound = (bowlerNumber) => {
        const isOut = batNumber === bowlerNumber;

        if (isOut) {
            if (innings === 1) {
                // First innings is over
                const newTarget = firstScore + 1;

                setTarget(newTarget);
                setCurrentBatter(secondBatter);
                setInnings(2);

                setMessage(
                    `${firstBatter} is OUT! ${secondBatter} needs ${newTarget} runs.`
                );
            } else {
                // Second innings is over.
                // First innings batter wins.
                setMessage(`${secondBatter} is OUT!`);

                finishMatch(firstBatter, secondScore);
                return;
            }
        } else {
            const newScore =
                innings === 1
                    ? firstScore + batNumber
                    : secondScore + batNumber;

            if (innings === 1) {
                setFirstScore(newScore);

                setMessage(
                    `${batNumber} RUNS! Total: ${newScore}`
                );
            } else {
                setSecondScore(newScore);

                // Check whether the target is achieved
                if (newScore >= target) {
                    finishMatch(secondBatter, newScore);
                    return;
                }

                setMessage(
                    `${batNumber} RUNS! Total: ${newScore}`
                );
            }
        }

        // Prepare for the next round
        setBatNumber(null);
        setGameStep('bat');
    };

    // FINISH MATCH AND SAVE TO DATABASE
    const finishMatch = async (
        matchWinner,
        finalSecondScore = secondScore
    ) => {
        setWinner(matchWinner);
        setScreen('result');

        try {
            await axios.post(`${API}/save`, {
                player1,
                player2,
                tossWinner,
                firstBatter,
                secondBatter,
                firstInningsScore: firstScore,
                secondInningsScore: finalSecondScore,
                winner: matchWinner,
                result: `${matchWinner} won the match`
            });

            console.log('Match saved successfully');
        } catch (error) {
            console.error(
                'Match saving error:',
                error.response?.data || error.message
            );
        }
    };

    // RESET MATCH
    const resetGame = () => {
        setScreen('setup');

        setPlayer1('');
        setPlayer2('');

        setTossChoice('');
        setTossP1('');
        setTossP2('');
        setTossStep(1);
        setTossWinner('');

        setFirstBatter('');
        setSecondBatter('');
        setCurrentBatter('');

        setFirstScore(0);
        setSecondScore(0);
        setTarget(0);

        setInnings(1);
        setBatNumber(null);
        setGameStep('bat');

        setMessage('');
        setWinner('');
    };

    // FETCH MATCH HISTORY
    const getHistory = async () => {
        try {
            const response = await axios.get(`${API}/history`);

            setHistory(response.data);
            setScreen('history');
        } catch (error) {
            console.error('History error:', error);
            alert('Unable to fetch match history');
        }
    };

    return (
        <div className="app">

            <header>
                <h1>🏏 ODD OR EVEN</h1>
                <p>THE HAND CRICKET CHALLENGE</p>
            </header>

            <main className="game-container">

                {/* PLAYER SETUP */}
                {screen === 'setup' && (
                    <section className="panel">

                        <h2>Welcome to Hand Cricket</h2>
                        <p>Enter the names of two players</p>

                        <input
                            type="text"
                            placeholder="Player 1 Name"
                            value={player1}
                            onChange={(e) =>
                                setPlayer1(e.target.value)
                            }
                        />

                        <input
                            type="text"
                            placeholder="Player 2 Name"
                            value={player2}
                            onChange={(e) =>
                                setPlayer2(e.target.value)
                            }
                        />

                        <button onClick={startGame}>
                            START MATCH
                        </button>

                        <button
                            className="secondary"
                            onClick={getHistory}
                        >
                            MATCH HISTORY
                        </button>

                    </section>
                )}

                {/* TOSS */}
                {screen === 'toss' && (
                    <Toss
                        player1={player1}
                        player2={player2}
                        tossChoice={tossChoice}
                        setTossChoice={setTossChoice}
                        tossStep={tossStep}
                        onSelectNumber={selectTossNumber}
                    />
                )}

                {/* TOSS RESULT */}
                {screen === 'tossResult' && (
                    <section className="panel">

                        <h2>🏆 TOSS RESULT</h2>

                        <p>
                            {player1}: {tossP1}
                        </p>

                        <p>
                            {player2}: {tossP2}
                        </p>

                        <h3>{tossWinner} WON THE TOSS!</h3>

                        <p>{tossWinner}, choose your role</p>

                        <div className="buttons">

                            <button
                                onClick={() => chooseRole('Batting')}
                            >
                                BAT FIRST
                            </button>

                            <button
                                onClick={() => chooseRole('Bowling')}
                            >
                                BOWL FIRST
                            </button>

                        </div>

                    </section>
                )}

                {/* GAME */}
                {screen === 'game' && (
                    <section className="panel">

                        <Scoreboard
                            firstBatter={firstBatter}
                            secondBatter={secondBatter}
                            firstScore={firstScore}
                            secondScore={secondScore}
                            innings={innings}
                            target={target}
                        />

                        <h2>{currentBatter} – BATTING</h2>

                        <p>
                            {otherPlayer(currentBatter)} – BOWLING
                        </p>

                        <GameBoard
                            title={
                                gameStep === 'bat'
                                    ? `${currentBatter}, choose your number`
                                    : `${otherPlayer(currentBatter)}, choose your number`
                            }
                            onSelect={selectNumber}
                        />

                        <div className="result-message">
                            {message}
                        </div>

                        {gameStep === 'bowl' && (
                            <p>Pass the device to the bowler!</p>
                        )}

                    </section>
                )}

                {/* MATCH RESULT */}
                {screen === 'result' && (
                    <Result
                        winner={winner}
                        firstBatter={firstBatter}
                        secondBatter={secondBatter}
                        firstScore={firstScore}
                        secondScore={secondScore}
                        onRestart={resetGame}
                        onHistory={getHistory}
                    />
                )}

                {/* MATCH HISTORY */}
                {screen === 'history' && (
                    <section className="panel">

                        <h2>🏏 MATCH HISTORY</h2>

                        {history.length === 0 && (
                            <p>No matches played yet.</p>
                        )}

                        {history.map((match) => (
                            <div
                                className="history-item"
                                key={match._id}
                            >

                                <h3>
                                    {match.player1} vs {match.player2}
                                </h3>

                                <p>
                                    First innings: {match.firstInningsScore}
                                </p>

                                <p>
                                    Second innings: {match.secondInningsScore}
                                </p>

                                <strong>
                                    Winner: {match.winner}
                                </strong>

                            </div>
                        ))}

                        <button onClick={resetGame}>
                            BACK TO HOME
                        </button>

                    </section>
                )}

            </main>
        </div>
    );
}

export default App;
