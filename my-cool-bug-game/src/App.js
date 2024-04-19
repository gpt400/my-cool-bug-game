import React, { useState, useEffect } from 'react';
import './App.css';
import confetti from 'canvas-confetti';

const insectOrders = ['Coleoptera', 'Lepidoptera', 'Diptera', 'Hymenoptera', 'Orthoptera', 'Hemiptera'];
const bugImages = [
  { src: 'bug1.jpg', order: 'Coleoptera', citation: "Source: https://commons.wikimedia.org/wiki/File:Blister_beetle_(26390828032).jpg" },
  { src: 'bug2.jpg', order: 'Lepidoptera', citation: "Source: https://en.wikipedia.org/wiki/File:Sphinx_moth_(Adhemarius_gannascus).jpg" },
  { src: 'bug3.jpg', order: 'Hymenoptera', citation: "Source: https://arthropod.uark.edu/red-imported-fire-ant/" },
  { src: 'bug4.jpg', order: 'Hymenoptera', citation: "Source: https://arthropod.uark.edu/black-carpenter-ant/" },
  { src: 'bug5.jpg', order: 'Hymenoptera', citation: "Source: https://arthropod.uark.edu/european-hornet/" },
  { src: 'bug6.jpg', order: 'Hemiptera', citation: "Source: https://en.wikipedia.org/wiki/File:Palomena_prasina_MHNT_L%C3%A9guevin_Blanc.jpg/" },
  { src: 'bug7.jpg', order: 'Lepidoptera', citation: "Source: https://en.wikipedia.org/wiki/File:Peacock_butterfly_(Aglais_io)_2.jpg" },
  { src: 'bug8.jpg', order: 'Diptera', citation: "Source: https://en.wikipedia.org/wiki/File:Asilidae_by_kadavoor.jpg" },
  { src: 'bug9.jpg', order: 'Coleoptera', citation: "Source: https://en.wikipedia.org/wiki/File:7-Spotted-Ladybug-Coccinella-septempunctata-sq1.jpg" },
  { src: 'bug10.jpg', order: 'Orthoptera', citation: "Source: https://en.wikipedia.org/wiki/File:SGR_laying_(cropped).jpg" },
];

const funFacts = {
  Coleoptera: ["The dung beetle was seen as a symbol of rebirth in ancient Egypt, and revered.", "Some Catholics see the ladybug as a physical symbol of the Virgin Mary, and a sign of peace and love."],
  Lepidoptera: ["The term 'debugging' in computer programming came after a moth had to be physically removed from the Mark II Computer, an artillery guidance system used by the U.S. Navy in the 1940s.", "Monarch butterflies can migrate up to 3,000 miles each year."],
  Diptera: ["While reviled in western culture, ancient Egypt saw flies as a good omen.", "Mosquitos, carrying yellow fever, may have stemmed Napoleon's ambitions of an empire in the New World of the Americas."],
  Hymenoptera: ["To produce an 8oz jar of honey, a bee must visit a flower approx. one million times.", "Some species of wasps use a communal babysitting system, wherein wasps will watch over children that are not theirs."],
  Orthoptera: ["Crickets were once seen as symbols of good luck in the ancient Asia.", "Jiminy Cricket, a character from Walt Disney's Pinocchio, is probably the most famous fictional cricket. Probably."],
  Hemiptera: ["It costs a hotel nearly $7,000 every time a room is infested with bed bugs.", "'Cicada 3301' was the name given to a series of three puzzles, released online between 2012 and 2014. Nobody knows who created them, though it's author spoke anonymously that it was intended to recruit \"intelligent individuals.\" Many believe the author to be working for the NSA, CIA, or a cyber mercenary group."]
};

const hints = {
  Coleoptera: [
    "Look for two pairs of wings, where the front pair, known as elytra, forms a hard shell over the abdomen, meeting sharply down the middle.",
    "The back wings are thin and fold under the elytra; these beetles chew with distinct mouthparts."
  ],
  Diptera: [
    "Spot only one main pair of wings, distinguished by their minimal veining. Replace the second pair with small, knobbed halteres aiding in flight.",
    "Their mouthparts are specialized either for sucking or a combination of piercing and sucking."
  ],
  Hemiptera: [
    "Identify these by their four wings, with the front pair partly thick and leathery with delicate ends, often showing a clear triangular scutellum at the back's center.",
    "They have sharp mouthparts emerging from the head's front, adapted for piercing and sucking."
  ],
  Lepidoptera: [
    "Recognize them by their four wings, typically covered with tiny, overlapping scales. In some species, adults have reduced or no wings.",
    "Most adults use a coiled proboscis for feeding, though it can be reduced in some."
  ],
  Hymenoptera: [
    "These may have either two pairs of thin, veined wings or none at all, with a notable narrowing between the thorax and abdomen.",
    "Their mouthparts are built for chewing."
  ],
  Orthoptera: [
    "Front wings are narrow while the rear wings are wider and designed for flight, often tucked away when at rest.",
    "They have powerful back legs designed for jumping and straightforward chewing mouthparts."
  ],
  Odonata: [
    "Look for large, transparent wings with many veins, equal or larger at the back compared to the front, and prominent eyes usually found around water.",
    "Their environment typically includes lakes, ponds, and streams, supporting their predacious lifestyle."
  ]
};


function App() {
  const [currentBugIndex, setCurrentBugIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#ADD8E6');
  const [orderOptions, setOrderOptions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [showWinningEffect, setShowWinningEffect] = useState(false);

  useEffect(() => {
    if (!showRules) {
      selectRandomBug();
    }
  }, [showRules]);

  useEffect(() => {
    const redComponent = Math.floor(Math.random() * 256);
    const greenComponent = Math.floor(Math.random() * 256);
    const blueComponent = Math.floor(Math.random() * 256);
    setBackgroundColor(`rgb(${redComponent}, ${greenComponent}, ${blueComponent})`);
  }, [correctCount, incorrectCount]);

  useEffect(() => {
    if (correctCount === 5) {
      setShowWinningEffect(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [correctCount]);

  const closeWinPopup = () => {
    setShowWinningEffect(false);
  };

  const selectRandomBug = () => {
    const randomIndex = Math.floor(Math.random() * bugImages.length);
    setCurrentBugIndex(randomIndex);
    setOrderOptions(generateOrderOptions(bugImages[randomIndex].order));
  };

  const generateOrderOptions = (correctOrder) => {
    const otherOrders = insectOrders.filter(order => order !== correctOrder);
    const randomOrder = otherOrders[Math.floor(Math.random() * otherOrders.length)];
    return [correctOrder, randomOrder].sort(() => Math.random() - 0.5);
  };

  const handleGuess = (order) => {
    const correctOrder = bugImages[currentBugIndex].order;
    const isCorrect = order === correctOrder;
    setIsCorrectGuess(isCorrect);
    const message = isCorrect
      ? funFacts[correctOrder][Math.floor(Math.random() * funFacts[correctOrder].length)]
      : `Hint: ${hints[correctOrder][Math.floor(Math.random() * hints[correctOrder].length)]}`;
    setCorrectCount(prevCount => isCorrect ? prevCount + 1 : prevCount);
    setIncorrectCount(prevCount => prevCount + 1);
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
    selectRandomBug();
  };

  return (
    <div className="App" style={{ backgroundColor }}>
      {showRules && (
        <div className="Popup">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={`${process.env.PUBLIC_URL}/rules.png`} alt="Game Rules" style={{ width: '80%', height: 'auto' }} />
            <button style={{ marginTop: '20px' }} onClick={() => setShowRules(false)}>have fun :)</button>
          </div>
        </div>
      )}

      <div className="Score-container">
        Correct: {correctCount}
      </div>

      <header className="App-header">
        <img src={`${process.env.PUBLIC_URL}/title.png`} alt="My Cool Bug Game" style={{ width: '25%', height: 'auto' }} />
      </header>

      <div className="Game-container">
        <div className="Bug-container">
          <img src={`${process.env.PUBLIC_URL}/bug_pics/${bugImages[currentBugIndex].src}`} alt="A cool bug" />
          <p style={{ fontStyle: 'italic', fontSize: 'small' }}>{bugImages[currentBugIndex].citation}</p>
        </div>

        <div className="Order-buttons-container">
          {orderOptions.map((order, index) => (
            <button key={index} onClick={() => handleGuess(order)}>
              {order}
            </button>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="Popup">
          <img src={`${process.env.PUBLIC_URL}/${isCorrectGuess ? 'correct.png' : 'incorrect.png'}`} alt={isCorrectGuess ? "Correct" : "Incorrect"} style={{ width: '30%', height: 'auto' }} />
          <p>{popupMessage}</p>
        </div>
      )}

      {showWinningEffect && (
        <div className="Popup explosion-effect">
          <h1>YOU WIN!!!!!!!!!</h1>
          <button onClick={closeWinPopup} style={{ marginTop: '20px' }}>keep playing :)</button>
        </div>
      )}
    </div>
  );
}

export default App;
