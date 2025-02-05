"use client"

import React from "react"
import PaperCard from "@/components/PaperCard"
import { Paper, Challenge } from "@/types"

const papers: Paper[] = [
  {
    id: 1,
    title: "Advances in Quantum Computing",
    abstract: "This paper explores recent developments in quantum computing...",
    publishedDate: "2023-05-15",
    authors: [
      { name: "Dr. Alice Johnson", isHelpful: true },
      { name: "Prof. Bob Smith", isHelpful: true },
    ],
  },
  // Add more papers...
]

interface ResearchPapersListProps {
  challenge: Challenge; // Accept the selected challenge as a prop
  onClose: () => void; // Optional close handler
}

export default function ResearchPapersList({ challenge, onClose }: ResearchPapersListProps) {

  //  // Filter the papers based on the selected challenge
  //  const relatedPapers = papers.filter((paper) =>
  //   paper.challenges?.some((c) => c.id === challenge.id)
  // );

  console.log(challenge);
  
  return (
    <div className="relative container mx-auto bg-green-50 min-h-screen">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={onClose}
      >
        Close
      </button>
      <header className="bg-green-700 text-white p-4 flex items-center justify-center h-16">
        <h1 className="text-2xl font-bold">Research Papers</h1>
      </header>
      {papers.map((paper) => (
        <PaperCard 
          key={paper.id} 
          paper={paper} 
        />
      ))}
    </div>
  )
}
