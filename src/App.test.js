import React, { useState } from 'react';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  progressBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '40px',
    position: 'relative',
    paddingTop: '20px'
  },
  progressLine: {
    position: 'absolute',
    top: '30px',
    left: '0',
    right: '0',
    height: '2px',
    backgroundColor: '#e0e0e0',
    zIndex: 1
  },
  progressStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2
  },
  stepCircle: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
    color: '#fff',
    fontSize: '14px'
  },
  activeStep: {
    backgroundColor: '#00bcd4'
  },
  stepLabel: {
    fontSize: '14px',
    color: '#666'
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333'
  },
  optionBox: {
    padding: '15px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    marginBottom: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    transition: 'background-color 0.2s'
  },
  optionLabel: {
    marginLeft: '10px',
    fontSize: '16px'
  },
  button: {
    padding: '12px 24px',
    borderRadius: '25px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.2s'
  },
  nextButton: {
    backgroundColor: '#00bcd4',
    color: 'white',
    marginLeft: 'auto'
  },
  prevButton: {
    backgroundColor: 'white',
    color: '#00bcd4',
    border: '1px solid #00bcd4'
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px'
  },
  resultsContainer: {
    textAlign: 'center'
  },
  resultsTitle: {
    color: '#00bcd4',
    fontSize: '28px',
    marginBottom: '20px'
  },
  resultCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '30px'
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  cardTitle: {
    color: '#00bcd4',
    fontSize: '20px',
    marginBottom: '15px'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  listItem: {
    marginBottom: '10px',
    paddingLeft: '20px',
    position: 'relative'
  }
};

const SkinTypeQuiz = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const progressSteps = [
    { id: 1, label: 'Skin Issues' },
    { id: 2, label: 'Skin Care' },
    { id: 3, label: 'Skin Type' },
    { id: 4, label: 'Complete' }
  ];

  const skinIssues = [
    { id: 'acne', label: 'Acne' },
    { id: 'blemishes', label: 'Issues With Blemishes, Color & Tone' },
    { id: 'none', label: 'No Issues' }
  ];

  const calculateSkinType = () => {
    let skinType = {
      type: '',
      characteristics: [],
      recommendations: []
    };

    if (answers.oiliness === 'Always') {
      skinType.type = 'Oily';
      skinType.characteristics = [
        'Excess oil production',
        'Prone to acne',
        'Enlarged pores'
      ];
      skinType.recommendations = [
        'Use oil-free products',
        'Look for non-comedogenic formulas',
        'Include salicylic acid in routine'
      ];
    } else if (answers.oiliness === 'Never') {
      skinType.type = 'Dry';
      skinType.characteristics = [
        'Feels tight',
        'May show flaking',
        'Lacks moisture'
      ];
      skinType.recommendations = [
        'Use rich moisturizers',
        'Avoid harsh cleansers',
        'Include hyaluronic acid'
      ];
    } else {
      skinType.type = 'Combination';
      skinType.characteristics = [
        'Oily T-zone',
        'Dry cheeks',
        'Mixed concerns'
      ];
      skinType.recommendations = [
        'Use different products for different areas',
        'Balance hydration',
        'Use gentle products'
      ];
    }

    return skinType;
  };

  const handleAnswer = (question, answer) => {
    setAnswers(prev => ({ ...prev, [question]: answer }));
  };

  const handleNext = () => {
    if (currentStep === 3) {
      setShowResults(true);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (showResults) {
      setShowResults(false);
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const ResultsSection = () => {
    const results = calculateSkinType();
    
    return (
      <div style={styles.resultsContainer}>
        <h2 style={styles.resultsTitle}>Your Skin Analysis Results</h2>
        <p style={{ fontSize: '20px' }}>Your skin type is: {results.type}</p>
        
        <div style={styles.resultCards}>
          <div style={styles.resultCard}>
            <h3 style={styles.cardTitle}>Characteristics</h3>
            <ul style={styles.list}>
              {results.characteristics.map((char, index) => (
                <li key={index} style={styles.listItem}>• {char}</li>
              ))}
            </ul>
          </div>

          <div style={styles.resultCard}>
            <h3 style={styles.cardTitle}>Recommendations</h3>
            <ul style={styles.list}>
              {results.recommendations.map((rec, index) => (
                <li key={index} style={styles.listItem}>• {rec}</li>
              ))}
            </ul>
          </div>
        </div>

        <button
          style={{ ...styles.button, ...styles.nextButton, marginTop: '30px' }}
          onClick={() => {
            setShowResults(false);
            setCurrentStep(1);
            setAnswers({});
          }}
        >
          Retake Quiz
        </button>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {!showResults && (
        <div style={styles.progressBar}>
          <div style={styles.progressLine}></div>
          {progressSteps.map((step) => (
            <div key={step.id} style={styles.progressStep}>
              <div style={{
                ...styles.stepCircle,
                ...(currentStep >= step.id ? styles.activeStep : {})
              }}>
                {step.id}
              </div>
              <span style={styles.stepLabel}>{step.label}</span>
            </div>
          ))}
        </div>
      )}

      {showResults ? (
        <ResultsSection />
      ) : (
        <>
          {currentStep === 1 && (
            <div>
              <h2 style={styles.title}>Please Select Your Concerns:</h2>
              {skinIssues.map(issue => (
                <div
                  key={issue.id}
                  style={{
                    ...styles.optionBox,
                    backgroundColor: answers.skinIssues === issue.id ? '#f0f9fa' : '#fff'
                  }}
                  onClick={() => handleAnswer('skinIssues', issue.id)}
                >
                  <input
                    type="radio"
                    checked={answers.skinIssues === issue.id}
                    onChange={() => handleAnswer('skinIssues', issue.id)}
                  />
                  <span style={styles.optionLabel}>{issue.label}</span>
                </div>
              ))}
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 style={styles.title}>How often does your skin feel oily during the day?</h2>
              {['Never', 'Sometimes', 'Often', 'Always'].map(option => (
                <div
                  key={option}
                  style={{
                    ...styles.optionBox,
                    backgroundColor: answers.oiliness === option ? '#f0f9fa' : '#fff'
                  }}
                  onClick={() => handleAnswer('oiliness', option)}
                >
                  <input
                    type="radio"
                    checked={answers.oiliness === option}
                    onChange={() => handleAnswer('oiliness', option)}
                  />
                  <span style={styles.optionLabel}>{option}</span>
                </div>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 style={styles.title}>How does your skin react to new products?</h2>
              {[
                'Rarely has any reaction',
                'Sometimes becomes slightly irritated',
                'Often becomes red or irritated',
                'Very sensitive, usually reacts negatively'
              ].map(option => (
                <div
                  key={option}
                  style={{
                    ...styles.optionBox,
                    backgroundColor: answers.sensitivity === option ? '#f0f9fa' : '#fff'
                  }}
                  onClick={() => handleAnswer('sensitivity', option)}
                >
                  <input
                    type="radio"
                    checked={answers.sensitivity === option}
                    onChange={() => handleAnswer('sensitivity', option)}
                  />
                  <span style={styles.optionLabel}>{option}</span>
                </div>
              ))}
            </div>
          )}

          <div style={styles.navigationContainer}>
            {currentStep > 1 && (
              <button
                style={{ ...styles.button, ...styles.prevButton }}
                onClick={handlePrevious}
              >
                ← Previous
              </button>
            )}
            <button
              style={{ ...styles.button, ...styles.nextButton }}
              onClick={handleNext}
            >
              {currentStep === 3 ? 'See Results' : 'Next →'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SkinTypeQuiz;