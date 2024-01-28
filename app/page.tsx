"use client";
import React, { useState, useEffect, useCallback } from "react";
import GameComponent from "@/components/GameComponent";
import WordCard from "@/components/WordCard";
import FeatureFinder from "@/components/FeatureFinder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Spell from "@/components/Spell";

const HintIcon = () => <span>🔍</span>; 

interface WordCardProps {
  title: string;
  phonetics: string;
  definition: string;
  letterCount: number;
  patterns: string[];
}

export default function Home() {
  const [tab, setTab] = useState("word_card");
  const [wordData, setWordData] = useState<WordCardProps | null>(null);
  const [showHint, setShowHint] = useState(false);

  const fetchWordData = useCallback(() => {
    fetch("/api/create_response/")
      .then((response) => response.json())
      .then((data) => {
        setWordData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetchWordData();
  }, [fetchWordData]);

  const tabSequence = [
    "word_card",
    "feature_finder",
    "order_forwards",
    "order_backwards",
    "spell",
  ];

  const handleContinue = (currentTab: string) => {
    const currentIndex = tabSequence.indexOf(currentTab);
    const nextIndex = (currentIndex + 1) % tabSequence.length;
    if (nextIndex === 0) {
      fetchWordData(); // Refetch when returning to the start page
    }
    setTab(tabSequence[nextIndex]);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <div className="flex flex-col h-screen">
      <Tabs value={tab} className="flex-grow">
        <TabsList className="flex justify-center">
          <TabsTrigger value="word_card">Word</TabsTrigger>
          <TabsTrigger value="feature_finder">Study Features</TabsTrigger>
          <TabsTrigger value="order_forwards">Order Forwards</TabsTrigger>
          <TabsTrigger value="order_backwards">Order Backwards</TabsTrigger>
          <TabsTrigger value="spell">Spell</TabsTrigger>
        </TabsList>
        <div className="p-4 flex-grow flex flex-col justify-center items-center">
          {tabSequence.map((tabValue) => (
            <TabsContent value={tabValue} key={tabValue}>
              <div className="flex flex-col items-center">
                {tabValue !== "word_card" && (
                  <div
                    onClick={toggleHint}
                    className="hint-icon mb-4 cursor-pointer"
                  >
                    <HintIcon />
                  </div>
                )}
                <div
                  className={`flex ${
                    tabValue !== "word_card" && showHint
                      ? "flex-row"
                      : "flex-col"
                  }`}
                >
                  {tabValue !== "word_card" && showHint && wordData && (
                    <WordCard
                      title={wordData.title}
                      phonetics={wordData.phonetics}
                      definition={wordData.definition}
                      letterCount={wordData.letterCount}
                      patterns={wordData.patterns}
                    />
                  )}
                  <div className="flex flex-col items-center">
                    {tabValue === "word_card" && wordData && (
                      <WordCard
                        title={wordData.title}
                        phonetics={wordData.phonetics}
                        definition={wordData.definition}
                        letterCount={wordData.letterCount}
                        patterns={wordData.patterns}
                      />
                    )}
                    {tabValue === "feature_finder" && wordData && (
                      <FeatureFinder
                        title={wordData.title}
                        patterns={wordData.patterns}
                      />
                    )}
                    {tabValue === "order_forwards" && wordData && (
                      <GameComponent isForwards={true} title={wordData.title} />
                    )}
                    {tabValue === "order_backwards" && wordData && (
                      <GameComponent
                        isForwards={false}
                        title={wordData.title}
                      />
                    )}
                    {tabValue === "spell" && <Spell />}
                  </div>
                </div>
                <button
                  className="btn mt-4 bg-black text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleContinue(tabValue)}
                >
                  Continue
                </button>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
