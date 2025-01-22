'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useChatContext } from '@/lib/ChatContent';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';
import { ChatMessage_T, LLMResponse } from '@/types';
import { CloudRain, Fish } from 'lucide-react';

const mockLLMResponse: LLMResponse = {
  summary: "Climate change poses significant challenges to global sustainability efforts.",
  challenges: [
    {
      id: "rising-sea-levels",
      name: "Rising Sea Levels",
      explanation: "Coastal communities are at risk due to melting ice caps and thermal expansion of oceans.",
      citation: "IPCC, 2021: Climate Change 2021: The Physical Science Basis.",
      icon: CloudRain,
    },
    {
      id: "extreme-weather-events",
      name: "Extreme Weather Events",
      explanation: "Increased frequency and intensity of hurricanes, droughts, and heatwaves threaten ecosystems and human settlements.",
      citation: "World Meteorological Organization, State of the Global Climate 2020.",
      icon: CloudRain,
    },
    {
      id: "biodiversity-loss",
      name: "Biodiversity Loss",
      explanation: "Rapid changes in temperature and precipitation patterns lead to habitat destruction and species extinction.",
      citation: "IPBES, 2019: Global Assessment Report on Biodiversity and Ecosystem Services.",
      icon: Fish,
    },
  ],
};

function ClimateChatContent() {
  const { query, setQuery, messages, setMessages } = useChatContext();
  const [input, setInput] = useState('');

  useEffect(() => {
    if (query) {
      const initialUserMessage: ChatMessage_T = { id: Date.now(), type: 'user', content: query };
      const initialLLMMessage: ChatMessage_T = { id: Date.now() + 1, type: 'llm', content: mockLLMResponse };
      setMessages([initialUserMessage, initialLLMMessage]);

      setQuery(''); // Clear query after processing
    }
  }, [query, setMessages, setQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newUserMessage: ChatMessage_T = { id: Date.now(), type: 'user', content: input };
      const newLLMMessage: ChatMessage_T = { id: Date.now() + 1, type: 'llm', content: mockLLMResponse };
      setMessages([...messages, newUserMessage, newLLMMessage]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-green-50">
        <MessageList messages={messages} />
      </div>

      {/* Fixed Input */}
      <div className="bg-green-50 pb-6">
        <MessageInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default function ClimateChat() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClimateChatContent />
    </Suspense>
  );
}
