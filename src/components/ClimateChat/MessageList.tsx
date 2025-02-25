"use client";
import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { ChatMessage_T as ChatMessageType, Challenge } from "@/types";

/**
 * MessageList Component
 * 
 * Renders a list of chat messages, including user inputs and LLM responses.
 * Automatically scrolls to the latest user message when new messages are added.
 * 
 * @param {Object} props - Component props
 * @param {ChatMessageType[]} props.messages - Array of chat messages
 * @returns {JSX.Element} The rendered MessageList component
 */
export default function MessageList({
  messages,
  onChallengeSelect,
}: {
  messages: ChatMessageType[];
  onChallengeSelect: (challenge: Challenge) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const userMessageRef = useRef<HTMLDivElement>(null);

  // Effect to auto-scroll to the latest user message when messages update.
  useEffect(() => {
    if (messages && userMessageRef.current) {
      userMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[75vh] overflow-y-auto" // Full width and scrollable height
      data-testid="message-list-container"
    >
      <div className="max-w-4xl mx-auto p-4"> {/* Center messages */}
      {messages.map((message) => (
          <div
            key={message.id}
            ref={message.type === 'user' ? userMessageRef : null} // Attach ref only to user messages
          >
            <ChatMessage message={message} onChallengeSelect={onChallengeSelect}/>
          </div>
        ))}
      </div>
    </div>
  );
}
