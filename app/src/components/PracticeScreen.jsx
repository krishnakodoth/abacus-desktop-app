import { useState, useEffect } from 'react';
import { generateQuestion, calculateAnswer } from '../logic/generator';

function PracticeScreen({ level, onBack }) {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    const newQuestion = generateQuestion({
      digits: level.digits,
      count: level.count,
      mixed: level.mixed || false,
      allowNegative: level.allowNegative || false,
    });
    setQuestion(newQuestion);
    setAnswer(calculateAnswer(newQuestion));
    setShowAnswer(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    generateNewQuestion();
  };

  if (!question) {
    return <div className="practice-screen">Loading...</div>;
  }

  return (
    <div className="practice-screen">
      <div className="practice-header">
        <h2>{level.name} Level</h2>
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
      </div>

      <div className="question-display">
        {question.numbers.map((number, index) => (
          <div key={index} className="question-number">
            {index > 0 && (
              <span className="operation">{question.operations[index - 1]}</span>
            )}
            <span>{number}</span>
          </div>
        ))}

        <div className="answer-line"></div>

        <div className={`answer-display ${!showAnswer ? 'hidden' : ''}`}>
          {showAnswer ? answer : '?'}
        </div>
      </div>

      <div className="practice-controls">
        {!showAnswer && (
          <button className="control-button show-answer" onClick={handleShowAnswer}>
            Show Answer
          </button>
        )}
        <button className="control-button" onClick={handleNextQuestion}>
          Next Question
        </button>
      </div>
    </div>
  );
}

export default PracticeScreen;
