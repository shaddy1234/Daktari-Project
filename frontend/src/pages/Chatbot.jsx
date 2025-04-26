import React, { useState, useEffect, useRef } from "react";
import api from "../api/apiClient";
import LoadingButton from "../components/LoadingButton";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader"; // Import Loader

function Chatbot() {
  const [messages, setMessages] = useState([]); // Start empty, load history
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true); // State for history loading
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  // Fetch chat history on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.id) {
        setIsHistoryLoading(false);
        return;
      }
      setIsHistoryLoading(true);
      setError(null);
      try {
        console.log("Fetching chat history for user:", user.id);
        const response = await api.chat.getHistory(user.id);
        console.log("History response:", response);
        if (response.success && Array.isArray(response.data)) {
          // Format history data if needed, assuming backend sends { text: string, isBot: boolean }
          const formattedHistory = response.data.map((item) => ({
            text: item.text,
            isBot: item.isBot,
            // timestamp: item.timestamp // Optional: if you need timestamp
          }));
          setMessages([
            {
              text: "Hello! I'm your AI health assistant. How can I help you today?",
              isBot: true,
            },
            ...formattedHistory, // Add fetched history
          ]);
        } else {
          setMessages([
            // Set default message even if history fetch fails or is empty
            {
              text: "Hello! I'm your AI health assistant. How can I help you today?",
              isBot: true,
            },
          ]);
          if (!response.success) {
            setError("Could not load chat history.");
          }
        }
      } catch (error) {
        setError("Failed to load chat history.");
        console.error("Chat history fetch error:", error);
        setMessages([
          // Set default message on error
          {
            text: "Hello! I'm your AI health assistant. How can I help you today?",
            isBot: true,
          },
        ]);
      } finally {
        setIsHistoryLoading(false);
      }
    };

    fetchHistory();
  }, [user]); // Re-fetch if user changes

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !user?.id) return;

    const userMessageText = input;
    // Add user message immediately to chat for responsiveness
    setMessages((prev) => [...prev, { text: userMessageText, isBot: false }]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      // Send message to backend API
      const response = await api.chat.sendMessage(userMessageText, user.id);

      if (response.success && response.data?.aiResponse) {
        // Add AI response to chat
        setMessages((prev) => [
          ...prev,
          {
            text: response.data.aiResponse,
            isBot: true,
          },
        ]);
      } else {
        // If API call succeeded but response format is wrong or lacks aiResponse
        throw new Error(
          response.error || "Received an invalid response from the server."
        );
      }
    } catch (error) {
      const errorMessage =
        error.message || "Failed to get a response. Please try again.";
      setError(errorMessage);
      console.error("Chat error:", error);
      // Optionally add an error message to the chat interface
      setMessages((prev) => [
        ...prev,
        { text: `Error: ${errorMessage}`, isBot: true, isError: true }, // Add an error flag/style
      ]);
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
          {isHistoryLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader size="large" />
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  message.isBot
                    ? message.isError // Add specific styling for errors
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                    : "bg-primary-600 text-white"
                } ${
                  message.isBot ? "mr-auto" : "ml-auto"
                } max-w-[80%] break-words whitespace-pre-line`} // Added break-words and whitespace-pre-line
              >
                {message.text}
              </div>
            ))
          )}
          {/* Display general fetch error if not showing inline */}
          {!isHistoryLoading && error && messages.length <= 1 && (
            <div className="p-4 rounded-lg bg-red-100 text-red-800 mr-auto max-w-[80%]">
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
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" // Added focus styles
            disabled={isLoading || isHistoryLoading} // Disable input while loading history or response
          />
          <LoadingButton
            type="submit"
            isLoading={isLoading}
            disabled={isHistoryLoading}
          >
            Send
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
