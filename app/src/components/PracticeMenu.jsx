import { useState } from 'react';

const predefinedLevels = [
  { id: 1, name: 'Beginner', desc: '1-digit, 2 numbers', digits: 1, count: 2 },
  { id: 2, name: 'Easy', desc: '1-digit, 3 numbers', digits: 1, count: 3 },
  { id: 3, name: 'Medium', desc: '2-digit, 3 numbers', digits: 2, count: 3 },
  { id: 4, name: 'Hard', desc: '2-digit, 4 numbers', digits: 2, count: 4 },
  { id: 5, name: 'Expert', desc: '3-digit, 3 numbers', digits: 3, count: 3 },
  { id: 6, name: 'Master', desc: '3-digit, 4 numbers', digits: 3, count: 4 },
];

function PracticeMenu({ onLevelSelect, onBack }) {
  const [customDigits, setCustomDigits] = useState(1);
  const [customCount, setCustomCount] = useState(2);
  const [customMixed, setCustomMixed] = useState(false);
  const [allowNegative, setAllowNegative] = useState(false);

  const handlePredefinedLevel = (level) => {
    onLevelSelect({
      name: level.name,
      digits: level.digits,
      count: level.count,
      allowNegative: allowNegative,
    });
  };

  const handleCustomStart = () => {
    onLevelSelect({
      name: 'Custom',
      digits: customDigits,
      count: customCount,
      mixed: customMixed,
      allowNegative: allowNegative,
    });
  };

  return (
    <div className="menu-page">
      <div className="menu-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h2>📚 Practice Mode</h2>
      </div>

      <div className="menu-content">
        <div className="level-section">
          <h3>Configuration</h3>
          <div className="custom-level">
            <div className="custom-control">
              <label>
                <input
                  type="checkbox"
                  checked={allowNegative}
                  onChange={(e) => setAllowNegative(e.target.checked)}
                />
                {' '}Allow negative results
              </label>
            </div>
          </div>
        </div>

        <div className="level-section">
          <h3>Predefined Levels</h3>
          <div className="level-buttons">
            {predefinedLevels.map((level) => (
              <button
                key={level.id}
                className="level-button"
                onClick={() => handlePredefinedLevel(level)}
              >
                <span className="level-name">{level.name}</span>
                <span className="level-desc">{level.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="level-section">
          <h3>Custom Level</h3>
          <div className="custom-level">
            <h4>Create Your Own Challenge</h4>
            <div className="custom-controls">
              <div className="custom-control">
                <label htmlFor="digits">Number of Digits:</label>
                <select
                  id="digits"
                  value={customDigits}
                  onChange={(e) => setCustomDigits(Number(e.target.value))}
                  disabled={customMixed}
                >
                  <option value={1}>1 digit (0-9)</option>
                  <option value={2}>2 digits (10-99)</option>
                  <option value={3}>3 digits (100-999)</option>
                </select>
              </div>

              <div className="custom-control">
                <label htmlFor="count">Count of Numbers:</label>
                <select
                  id="count"
                  value={customCount}
                  onChange={(e) => setCustomCount(Number(e.target.value))}
                >
                  <option value={2}>2 numbers</option>
                  <option value={3}>3 numbers</option>
                  <option value={4}>4 numbers</option>
                </select>
              </div>

              <div className="custom-control">
                <label>
                  <input
                    type="checkbox"
                    checked={customMixed}
                    onChange={(e) => setCustomMixed(e.target.checked)}
                  />
                  {' '}Mixed digits (1-3 digits randomly)
                </label>
              </div>

              <button className="custom-start-btn" onClick={handleCustomStart}>
                Start Custom Practice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticeMenu;
