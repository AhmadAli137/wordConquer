import React, { useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FeatureFinderProps {
  title: string;
  patterns: string[];
}

const FeatureFinder = ({ title, patterns }: FeatureFinderProps) => {
  const [checkedPatterns, setCheckedPatterns] = useState<boolean[]>(
    new Array(patterns.length).fill(false)
  );

  const handleCheckboxChange = (index: number) => {
    const newCheckedPatterns = [...checkedPatterns];
    if (title.includes(patterns[index])) {
      newCheckedPatterns[index] = !newCheckedPatterns[index];
    }
    setCheckedPatterns(newCheckedPatterns);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-4xl mx-auto p-10">
        <CardHeader>
          <CardTitle>Pattern Identification</CardTitle>
          <CardDescription>
            Mark off smaller words in the word as you identify them.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {patterns.map((pattern, index) => (
            <div className="flex items-start text-lg" key={index}>
              <Checkbox
                id={`pattern${index + 1}`}
                onClick={() => handleCheckboxChange(index)}
              />
              <Label
                className={`ml-3 ${
                  checkedPatterns[index] ? "text-green-500" : ""
                }`}
                htmlFor={`pattern${index + 1}`}
              >
                {pattern}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureFinder;
