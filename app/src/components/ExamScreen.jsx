import { useState, useEffect } from 'react';
import { generateQuestion, calculateAnswer } from '../logic/generator';
import { downloadQuestionsPDF } from '../utils/pdfGenerator';

function ExamScreen({ level, onBack, onComplete }) {
  const totalQuestions = level.questionCount || 50;
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    generateAllQuestions();
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    if (isStarted && startTime) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    }
  }, [isStarted, startTime]);

  const generateAllQuestions = () => {
    const generatedQuestions = [];
    for (let i = 0; i < totalQuestions; i++) {
      const question = generateQuestion({
        digits: level.digits,
        count: level.count,
        mixed: level.mixed || false,
        allowNegative: level.allowNegative || false,
      });
      generatedQuestions.push({
        questionNumber: i + 1,
        ...question,
        answer: calculateAnswer(question),
      });
    }
    setQuestions(generatedQuestions);
  };

  const handleDownloadQuestions = () => {
    downloadQuestionsPDF(questions, level, false);
  };

  const handleStart = () => {
    setIsStarted(true);
    setStartTime(Date.now());
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    if (timerInterval) clearInterval(timerInterval);
    onComplete({
      questions,
      totalTime: elapsedTime,
      level,
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return <div className="exam-screen">Loading questions...</div>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="exam-screen">
      <div className="exam-header">
        <div className="exam-info">
          <h2>🎯 Exam Mode</h2>
          <span className="level-badge">{level.name}</span>
        </div>
        <button className="back-button" onClick={onBack}>
          ← Exit Exam
        </button>
      </div>

      {!isStarted ? (
        <div className="exam-start-screen">
          <div className="exam-instructions">
            <h3>📝 Exam Instructions</h3>
            <ul>
              <li>You will see <strong>{totalQuestions} questions</strong> one by one</li>
              <li>Write down the numbers in your notebook</li>
              <li>Navigate through questions at your own pace</li>
              <li>Timer will start when you click "Start Exam"</li>
              <li>View all answers at the end</li>
            </ul>
            <div className="exam-ready">
              <p>Ready to begin?</p>
              <div className="exam-start-buttons">
                <button className="download-questions-button" onClick={handleDownloadQuestions}>
                  📥 Download Questions (PDF)
                </button>
                <button className="start-exam-button" onClick={handleStart}>
                  Start Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="exam-progress">
            <div className="progress-info">
              <span className="question-counter">
                Question {currentQuestion.questionNumber} of {totalQuestions}
              </span>
              <span className="timer">⏱️ {formatTime(elapsedTime)}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentIndex + 1) / totalQuestions * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="question-display">
            {currentQuestion.numbers.map((number, index) => (
              <div key={index} className="question-number">
                {index > 0 && (
                  <span className="operation">{currentQuestion.operations[index - 1]}</span>
                )}
                <span>{number}</span>
              </div>
            ))}
            <div className="answer-line"></div>
          </div>

          <div className="exam-controls">
            <button 
              className="control-button secondary" 
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              ← Previous
            </button>
            
            {currentIndex < totalQuestions - 1 ? (
              <button className="control-button" onClick={handleNext}>
                Next →
              </button>
            ) : (
              <button className="control-button finish" onClick={handleFinish}>
                Finish Exam
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ExamScreen;
