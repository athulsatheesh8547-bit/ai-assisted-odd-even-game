
function GameBoard({ title, onSelect }) {
    return (
        <div>
            <h3>{title}</h3>

            <div className="number-grid">
                {[1, 2, 3, 4, 5, 6].map(number => (
                    <button
                        key={number}
                        onClick={() => onSelect(number)}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default GameBoard;
