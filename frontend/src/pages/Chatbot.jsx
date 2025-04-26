import React, { useState, useEffect, useRef } from "react";
import api from "../api/apiClient";
import LoadingButton from "../components/LoadingButton";
import { useAuth } from "../contexts/AuthContext";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your AI health assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { text: input, isBot: false }]);
    const userMessage = input;
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      // Send message to backend API
      const response = await api.chat.sendMessage(userMessage, user.id);

      if (response.success) {
        // Add AI response to chat
        setMessages((prev) => [
          ...prev,
          {
            text: response.data.aiResponse,
            isBot: true,
          },
        ]);
      }
    } catch (error) {
      setError("Failed to get a response. Please try again.");
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        AI Health Assistant
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-4">
        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.isBot
                  ? "bg-gray-100 text-gray-800"
                  : "bg-primary-600 text-white ml-auto"
              } ${message.isBot ? "mr-12" : "ml-12"} max-w-[80%]`}
            >
              {message.text}
            </div>
          ))}
          {error && (
            <div className="p-4 rounded-lg bg-red-100 text-red-800 mr-12 max-w-[80%]">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-md"
            disabled={isLoading}
          />
          <LoadingButton type="submit" isLoading={isLoading}>
            Send
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
