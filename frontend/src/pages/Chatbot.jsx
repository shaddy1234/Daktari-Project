import React, { useState, useEffect, useRef, useCallback } from "react";
import api from "../api/apiClient";
import LoadingButton from "../components/LoadingButton";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import { TrashIcon } from "@heroicons/react/24/outline"; // Using Heroicons for the trash icon

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for sending messages
  const [isHistoryLoading, setIsHistoryLoading] = useState(true); // Loading state for initial history fetch
  const [isClearing, setIsClearing] = useState(false); // Loading state for clearing chat
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const { user } = useAuth(); // Get user from AuthContext

  // Define the initial greeting message
  const initialMessage = useCallback(
    () => ({
      text: "Hello! I'm your AI health assistant. How can I help you today?",
      isBot: true,
    }),
    []
  );

  // Fetch chat history on component mount or when user changes
  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.id) {
        setMessages([initialMessage()]); // Show only initial message if no user
        setIsHistoryLoading(false);
        return;
      }
      setIsHistoryLoading(true);
      setError(null); // Clear previous errors
      try {
        console.log("Fetching chat history for user:", user.id);
        const response = await api.chat.getHistory(user.id);
        console.log("History response:", response);
        if (response.success && Array.isArray(response.data)) {
          // Format history data assuming backend sends { text: string, isBot: boolean }
          const formattedHistory = response.data.map((item) => ({
            text: item.text,
            isBot: item.isBot,
          }));
          setMessages([initialMessage(), ...formattedHistory]); // Prepend initial message
        } else {
          setMessages([initialMessage()]); // Set only initial message if history fetch fails or is empty
          if (!response.success) {
            setError(response.error || "Could not load chat history.");
          }
        }
      } catch (err) {
        setError(err.message || "Failed to load chat history.");
        console.error("Chat history fetch error:", err);
        setMessages([initialMessage()]); // Set only initial message on error
      } finally {
        setIsHistoryLoading(false);
      }
    };

    fetchHistory();
    // Dependency array includes user and the memoized initialMessage function
  }, [user, initialMessage]);

  // Auto-scroll to the bottom of the messages container when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !user?.id || isLoading || isClearing) return; // Prevent sending if input empty, no user, or loading/clearing

    const userMessageText = input;
    // Add user message immediately to the chat for better UX
    setMessages((prev) => [...prev, { text: userMessageText, isBot: false }]);
    setInput(""); // Clear the input field
    setIsLoading(true); // Set loading state for sending
    setError(null); // Clear previous errors

    try {
      // Send message to the backend API
      const response = await api.chat.sendMessage(userMessageText, user.id);

      if (response.success && response.data?.aiResponse) {
        // Add the AI's response to the chat
        setMessages((prev) => [
          ...prev,
          {
            text: response.data.aiResponse,
            isBot: true,
          },
        ]);
      } else {
        // Handle cases where the API call succeeded but the response format is unexpected
        throw new Error(
          response.error || "Received an invalid response from the server."
        );
      }
    } catch (err) {
      const errorMessage =
        err.message || "Failed to get a response. Please try again.";
      setError(errorMessage);
      console.error("Chat send error:", err);
      // Optionally add an error message directly into the chat interface
      setMessages((prev) => [
        ...prev,
        { text: `Error: ${errorMessage}`, isBot: true, isError: true }, // Add an error flag/style
      ]);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Handle clearing the chat history
  const handleClearChat = async () => {
    // Prevent clearing if no user, already clearing, or only the initial message exists
    if (!user?.id || isClearing || messages.length <= 1) return;

    // Confirmation dialog
    if (
      !window.confirm(
        "Are you sure you want to clear the chat history? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsClearing(true); // Set clearing state
    setError(null); // Clear previous errors
    try {
      console.log("Clearing chat history for user:", user.id);
      const response = await api.chat.clearHistory(user.id); // Call the API client function
      if (response.success) {
        setMessages([initialMessage()]); // Reset messages to only the initial greeting
        console.log("Chat history cleared successfully on frontend.");
      } else {
        // Handle potential failure response from the API
        throw new Error(
          response.error || "Failed to clear chat history on the server."
        );
      }
    } catch (err) {
      const errorMessage =
        err.message || "Could not clear chat. Please try again.";
      setError(errorMessage);
      console.error("Clear chat error:", err);
      // Error is displayed below the chat input
    } finally {
      setIsClearing(false); // Reset clearing state
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section with Title and Clear Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          AI Health Assistant
        </h1>
        {/* Clear Chat Button */}
        <button
          onClick={handleClearChat}
          disabled={isClearing || isHistoryLoading || messages.length <= 1} // Disable if clearing, loading history, or only initial message shown
          className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white transition ease-in-out duration-150 ${
            isClearing || isHistoryLoading || messages.length <= 1
              ? "bg-gray-400 cursor-not-allowed" // Disabled state style
              : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" // Active state style
          }`}
          aria-label="Clear chat history"
        >
          {isClearing ? (
            <>
              <Loader size="small" color="white" className="mr-2" /> Clearing...
            </>
          ) : (
            <>
              <TrashIcon className="h-4 w-4 mr-1" aria-hidden="true" /> Clear
              Chat
            </>
          )}
        </button>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-4">
        {/* Messages Display Area */}
        <div className="h-96 overflow-y-auto mb-4 space-y-4 p-2">
          {" "}
          {/* Added padding */}
          {isHistoryLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader size="large" /> {/* Show loader while history loads */}
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index} // Using index as key is okay here if messages aren't reordered/deleted individually
                className={`p-3 rounded-lg shadow-sm ${
                  // Adjusted padding and shadow
                  message.isBot
                    ? message.isError
                      ? "bg-red-100 text-red-800" // Bot error message style
                      : "bg-gray-100 text-gray-800" // Bot message style
                    : "bg-primary-600 text-white" // User message style
                } ${
                  message.isBot ? "mr-auto" : "ml-auto"
                } max-w-[85%] break-words whitespace-pre-line`} // Adjusted max-width
              >
                {message.text}
              </div>
            ))
          )}
          {/* Element to scroll to */}
          <div ref={messagesEndRef} />
        </div>

        {/* Display general error messages below the chat area */}
        {!isHistoryLoading && error && (
          <div className="p-3 mb-4 rounded-md bg-red-100 text-red-700 text-sm">
            Error: {error}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100" // Added disabled style
            disabled={isLoading || isHistoryLoading || isClearing} // Disable input during loading/clearing states
            aria-label="Chat message input"
          />
          <LoadingButton
            type="submit"
            isLoading={isLoading} // Show loading state only for sending message
            disabled={isHistoryLoading || isClearing || !input.trim()} // Disable send if loading history, clearing, or input is empty
            className="px-4 py-2" // Adjusted padding
          >
            Send
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
