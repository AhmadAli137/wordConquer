"use client";
import React from "react";
import {
  CardHeader,
  CardFooter,
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SpeakerIcon from "@/components/SpeakerIcon";

interface WordCardProps {
    title: string;
    phonetics: string;
    definition: string;
    letterCount: number;
    patterns: string[];
}

const WordCard = ({ title, phonetics, definition, letterCount, patterns }: WordCardProps) => {
  return (
    <>
      <Card className="flex items-center justify-center py-2 w-full max-w-md mx-auto">
        <CardHeader className="flex justify-center items-center h-64">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-2">{title}</h2>
            <p className="text-lg mb-2">/{phonetics}/</p>
            <p className="text-sm">{definition}</p>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-end items-center">
          <SpeakerIcon />
          <span className="sr-only">Pronounce</span>
        </CardFooter>
      </Card>
    </>
  );
};

export default WordCard;