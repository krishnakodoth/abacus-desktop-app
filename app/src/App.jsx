import { useState } from 'react';
import HomePage from './components/HomePage';
import PracticeMenu from './components/PracticeMenu';
import ExamMenu from './components/ExamMenu';
import PracticeScreen from './components/PracticeScreen';
import ExamScreen from './components/ExamScreen';
import ExamResults from './components/ExamResults';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [examData, setExamData] = useState(null);

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setCurrentScreen('practice');
  };

  const handleExamSelect = (level) => {
    setSelectedLevel(level);
    setCurrentScreen('exam');
  };

  const handleExamComplete = (data) => {
    setExamData(data);
    setCurrentScreen('results');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedLevel(null);
    setExamData(null);
  };

  const handleBackToMenu = (menuType) => {
    setCurrentScreen(menuType);
    setSelectedLevel(null);
  };

  const handleRetryExam = () => {
    if (examData && examData.level) {
      setCurrentScreen('exam');
      setSelectedLevel(examData.level);
      setExamData(null);
    }
  };

  return (
    <div className="app">
      {currentScreen === 'home' && (
        <>
          <header className="app-header">
            <h1>🧮 Abacus Practice</h1>
            <p>Practice mental math like a pro!</p>
          </header>
          <main className="app-main">
            <HomePage onNavigate={handleNavigate} />
          </main>
        </>
      )}

      {currentScreen === 'practice-menu' && (
        <>
          <header className="app-header">
            <h1>🧮 Abacus Practice</h1>
            <p>Practice mental math like a pro!</p>
          </header>
          <main className="app-main">
            <PracticeMenu 
              onLevelSelect={handleLevelSelect}
              onBack={handleBackToHome}
            />
          </main>
        </>
      )}

      {currentScreen === 'exam-menu' && (
        <>
          <header className="app-header">
            <h1>🧮 Abacus Practice</h1>
            <p>Practice mental math like a pro!</p>
          </header>
          <main className="app-main">
            <ExamMenu 
              onExamSelect={handleExamSelect}
              onBack={handleBackToHome}
            />
          </main>
        </>
      )}

      {currentScreen === 'practice' && selectedLevel && (
        <>
          <header className="app-header">
            <h1>🧮 Abacus Practice</h1>
            <p>Practice mental math like a pro!</p>
          </header>
          <main className="app-main">
            <PracticeScreen 
              level={selectedLevel} 
              onBack={() => handleBackToMenu('practice-menu')} 
            />
          </main>
        </>
      )}

      {currentScreen === 'exam' && selectedLevel && (
        <>
          <header className="app-header">
            <h1>🧮 Abacus Practice</h1>
            <p>Practice mental math like a pro!</p>
          </header>
          <main className="app-main">
            <ExamScreen 
              level={selectedLevel} 
              onBack={() => handleBackToMenu('exam-menu')}
              onComplete={handleExamComplete}
            />
          </main>
        </>
      )}

      {currentScreen === 'results' && examData && (
        <>
          <header className="app-header">
            <h1>🧮 Abacus Practice</h1>
            <p>Practice mental math like a pro!</p>
          </header>
          <main className="app-main">
            <ExamResults 
              examData={examData}
              onBack={handleBackToHome}
              onRetry={handleRetryExam}
            />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
