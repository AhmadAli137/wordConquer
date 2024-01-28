'use client'
import React, { useEffect, useState } from 'react';

interface ComponentProps {
    isForwards: boolean;
    title: string;
}

export default function Component({ isForwards, title }: ComponentProps) {
    function shuffleArray(array: string[]) {//Knuth shuffle
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function reverseString(str: string) {
        return str.split('').reverse().join('');
    }

    const [letters, setLetters] = useState(shuffleArray(title.split("")));
    const [droppedLetters, setDroppedLetters] = useState(Array(title.length).fill(''));

    const handleClickTop = (index: any) => {
        const newDroppedLetters = [...droppedLetters];
        const letter = newDroppedLetters[index];
        newDroppedLetters[index] = ''; // Remove the letter from the top div

        setDroppedLetters(newDroppedLetters);
        setLetters([...letters, letter]); // Add the letter back to the bottom div
    };

    const handleClickBottom = (letter: any) => {
        const index = letters.indexOf(letter);
        const newLetters = [...letters];
        newLetters.splice(index, 1); // Remove the letter from the bottom div

        setLetters(newLetters);
        const droppedIndex = droppedLetters.findIndex(l => l === ''); // Find the first empty spot
        if (droppedIndex !== -1) {
            const newDroppedLetters = [...droppedLetters];
            newDroppedLetters[droppedIndex] = letter; // Place the letter in the first empty spot
            setDroppedLetters(newDroppedLetters);
        }
    };

    useEffect(() => {
        // Check if all letters are dropped
        if (isForwards) {
            if (letters.length === 0) {
                // Compare the joined droppedLetters with the original title
                const formedWord = droppedLetters.join('');
                if (formedWord === title) {
                    alert("Matched!");
                }
            }
        } else {
            if (letters.length === 0) {
                // Compare the joined droppedLetters with the original title
                const formedWord = droppedLetters.join('');
                if (formedWord === reverseString(title)) {
                    alert("Matched!");
                }
            }
        }
    }, [letters, droppedLetters, title]);

    return (
        <main className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <h1 className="text-4xl font-bold mb-8 dark:text-white">
                {isForwards ? "Spell this word forwards" : "Spell this word backwards"}
            </h1>
            <div className="flex space-x-4 mb-8">
                {droppedLetters.map((letter, index) => (
                    <div key={index} className="h-14 w-14 bg-white border border-gray-300 rounded-md flex items-center justify-center text-2xl font-bold text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 cursor-pointer"
                        onClick={() => handleClickTop(index)}>
                        {letter}
                    </div>
                ))}
            </div>
            <div className="flex space-x-4">
                {letters.map((letter, index) => (
                    <div key={index} className="h-14 w-14 bg-white border-2 border-gray-200 rounded-md flex items-center justify-center cursor-pointer dark:bg-gray-800 dark:border-gray-700"
                        onClick={() => handleClickBottom(letter)}>
                        <div className="h-full w-full flex items-center justify-center text-2xl font-bold dark:text-white">
                            {letter}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}
