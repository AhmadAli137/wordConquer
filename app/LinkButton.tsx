"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface LinkButtonProps {
  title: string;
  link: string;
}

const LinkButton = ({ title, link }: LinkButtonProps) => {
  const router = useRouter();

  return (
    <button className="btn btn-primary" onClick={() => router.push(link)}>
      {title}
    </button>
  );
};

export default LinkButton;
