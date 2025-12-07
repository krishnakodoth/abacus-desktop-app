function HomePage({ onNavigate }) {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-icon">🧮</div>
        <h1>Abacus Practice</h1>
        <p className="hero-description">
          Master mental math with Abacus calculations
        </p>
      </div>

      <div className="home-navigation">
        <button 
          className="nav-card practice-card"
          onClick={() => onNavigate('practice-menu')}
        >
          <div className="nav-icon">📚</div>
          <h3>Practice Mode</h3>
          <p>Choose levels and practice at your own pace</p>
        </button>

        <button 
          className="nav-card exam-card"
          onClick={() => onNavigate('exam-menu')}
        >
          <div className="nav-icon">🎯</div>
          <h3>Exam Mode</h3>
          <p>Take a timed test with 50 questions</p>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
