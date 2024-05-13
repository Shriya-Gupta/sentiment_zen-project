import React, { useEffect, useState } from 'react';
import './typingeffect.css';

function TypingEffect({ prefix }) {
  const phrases = ["Best Friend", "Mood Enhancer", "Personal Recommender"];

  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 100; // Typing speed in milliseconds
  const backDelay = 500; // Delay after fully typing a phrase before deleting

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        // Typing phase
        setCharIndex(charIndex + 1);
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        // Delay after fully typing a phrase before deleting
        setTimeout(() => setIsDeleting(true), backDelay);
      } else if (isDeleting && charIndex === 0) {
        // Reset and move to the next phrase
        const nextIndex = (index + 1) % phrases.length;
        setIndex(nextIndex);
        setCurrentPhrase(phrases[nextIndex]);
        setIsDeleting(false); // Reset deleting state
      } else if (isDeleting && charIndex > 0) {
        // Deleting phase
        setCharIndex(charIndex - 1);
      }
    }, isDeleting ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, currentPhrase, index, isDeleting, phrases, typingSpeed, backDelay]);

  return <p className="cover-title">{prefix} {currentPhrase.substring(0, charIndex)}</p>;
}

export default TypingEffect;
