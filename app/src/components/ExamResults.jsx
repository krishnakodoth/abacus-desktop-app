import { useState } from 'react';
import { downloadQuestionsPDF, downloadExamResultsPDF } from '../utils/pdfGenerator';

function ExamResults({ examData, onBack, onRetry }) {
  const [showAnswers, setShowAnswers] = useState(false);
  const { questions, totalTime, level } = examData;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatTimeDetailed = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  const averageTime = (totalTime / questions.length).toFixed(1);

  const handleDownloadQuestions = () => {
    downloadQuestionsPDF(questions, level, false);
  };

  const handleDownloadWithAnswers = () => {
    downloadQuestionsPDF(questions, level, true);
  };

  const handleDownloadResults = () => {
    downloadExamResultsPDF(examData);
  };

  return (
    <div className="exam-results">
      <div className="results-header">
        <h2>🎉 Exam Completed!</h2>
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>
      </div>

      <div className="results-summary">
        <div className="summary-card">
          <div className="summary-icon">📊</div>
          <div className="summary-content">
            <h3>Total Questions</h3>
            <p className="summary-value">{questions.length}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">⏱️</div>
          <div className="summary-content">
            <h3>Total Time</h3>
            <p className="summary-value">{formatTimeDetailed(totalTime)}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">⚡</div>
          <div className="summary-content">
            <h3>Average Time</h3>
            <p className="summary-value">{averageTime}s / question</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">🎯</div>
          <div className="summary-content">
            <h3>Level</h3>
            <p className="summary-value">{level.name}</p>
          </div>
        </div>
      </div>

      <div className="results-actions">
        {!showAnswers ? (
          <button 
            className="control-button show-answers" 
            onClick={() => setShowAnswers(true)}
          >
            Show All Answers
          </button>
        ) : (
          <button 
            className="control-button secondary" 
            onClick={() => setShowAnswers(false)}
          >
            Hide Answers
          </button>
        )}
        <button className="control-button" onClick={onRetry}>
          Take Another Exam
        </button>
      </div>

      <div className="download-section">
        <h3>Download Options</h3>
        <div className="download-buttons">
          <button className="download-button" onClick={handleDownloadQuestions}>
            📥 Download Questions Only
          </button>
          <button className="download-button" onClick={handleDownloadWithAnswers}>
            📥 Download Questions + Answers
          </button>
          <button className="download-button primary" onClick={handleDownloadResults}>
            📥 Download Complete Results
          </button>
        </div>
      </div>

      {showAnswers && (
        <div className="answers-list">
          <h3>All Questions & Answers</h3>
          <div className="answers-grid">
            {questions.map((q, index) => (
              <div key={index} className="answer-item">
                <div className="answer-header">
                  <span className="question-num">Q{q.questionNumber}</span>
                </div>
                <div className="answer-question">
                  {q.numbers.map((num, idx) => (
                    <span key={idx}>
                      {idx > 0 && ` ${q.operations[idx - 1]} `}
                      {num}
                    </span>
                  ))}
                </div>
                <div className="answer-result">
                  = <strong>{q.answer}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamResults;
