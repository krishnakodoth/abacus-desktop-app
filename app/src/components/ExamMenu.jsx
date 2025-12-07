import { useState } from 'react';

function ExamMenu({ onExamSelect, onBack }) {
  const [examDigits, setExamDigits] = useState(2);
  const [examCount, setExamCount] = useState(3);
  const [examMixed, setExamMixed] = useState(false);
  const [questionCount, setQuestionCount] = useState(50);
  const [allowNegative, setAllowNegative] = useState(false);

  const handleExamStart = () => {
    onExamSelect({
      name: examMixed ? 'Mixed Exam' : `${examDigits}-digit Exam`,
      digits: examDigits,
      count: examCount,
      mixed: examMixed,
      questionCount: questionCount,
      allowNegative: allowNegative,
    });
  };

  return (
    <div className="menu-page">
      <div className="menu-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h2>🎯 Exam Mode</h2>
      </div>

      <div className="menu-content centered">
        <div className="exam-info-box">
          <div className="exam-info-icon">📝</div>
          <h3>Timed Exam - 50 Questions</h3>
          <p className="exam-info-text">
            Test your Abacus calculation skills with a comprehensive exam. 
            Configure your difficulty level below and start when ready.
          </p>
          
          <div className="exam-features">
            <div className="feature-item">
              <span className="feature-icon">⏱️</span>
              <span>Timer tracks your speed</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span>View all answers at the end</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📈</span>
              <span>Track your performance</span>
            </div>
          </div>
        </div>

        <div className="exam-config">
          <h4>Configure Your Exam</h4>
          <div className="custom-controls">
            <div className="custom-control">
              <label htmlFor="question-count">Number of Questions:</label>
              <select
                id="question-count"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
              >
                <option value={20}>20 questions</option>
                <option value={30}>30 questions</option>
                <option value={50}>50 questions</option>
                <option value={75}>75 questions</option>
                <option value={100}>100 questions</option>
              </select>
            </div>

            <div className="custom-control">
              <label htmlFor="exam-digits">Number of Digits:</label>
              <select
                id="exam-digits"
                value={examDigits}
                onChange={(e) => setExamDigits(Number(e.target.value))}
                disabled={examMixed}
              >
                <option value={1}>1 digit (0-9)</option>
                <option value={2}>2 digits (10-99)</option>
                <option value={3}>3 digits (100-999)</option>
              </select>
            </div>

            <div className="custom-control">
              <label htmlFor="exam-count">Count of Numbers:</label>
              <select
                id="exam-count"
                value={examCount}
                onChange={(e) => setExamCount(Number(e.target.value))}
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
                  checked={examMixed}
                  onChange={(e) => setExamMixed(e.target.checked)}
                />
                {' '}Mixed digits (1-3 digits randomly)
              </label>
            </div>

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

            <button className="exam-start-btn" onClick={handleExamStart}>
              🎯 Start Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamMenu;
