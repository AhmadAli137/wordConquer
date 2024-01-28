"use client";
import React from "react";

const SpeakerIcon = () => {
  return (
    <div>
      <button className="btn btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
          <circle cx="12" cy="14" r="4" />
          <line x1="12" x2="12.01" y1="6" y2="6" />
        </svg>
      </button>
    </div>
  );
};

export default SpeakerIcon;