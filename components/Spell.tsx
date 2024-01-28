import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

export default function Component() {
  const [currentContent, setCurrentContent] = useState('');

  const handleButtonClick = (letter: string) => {
    setCurrentContent(currentContent + letter);
  };

  const handleBackspaceClick = () => {
    setCurrentContent(currentContent.slice(0, -1));
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key.match(/^[A-Za-z]$/)) { // Check if the key is a letter
      setCurrentContent(currentContent + event.key.toLowerCase());
    } else if (event.key === 'Backspace') {
      setCurrentContent(currentContent.slice(0, -1));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentContent]);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex space-x-2 mb-12">
        {currentContent.split('').map((letter, index) => (
          <div key={index} className="w-8 h-8 border-b-2 border-gray-900 dark:border-gray-100 flex items-center justify-center text-md">
            {letter}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-11 gap-2 w-full max-w-md">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
          <Button 
            key={letter} 
            className="rounded-full" 
            variant="outline" 
            onClick={() => handleButtonClick(letter)}>
            {letter}
          </Button>
        ))}
        <Button 
          className="rounded-full" 
          variant="outline" 
          onClick={handleBackspaceClick}>
          ←
        </Button>
      </div>
    </main>
  );
}
