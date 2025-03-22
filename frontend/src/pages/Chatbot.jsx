import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI health assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isBot: false }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I understand your concern. While I can provide general information, please consult with a healthcare professional for medical advice.",
        isBot: true
      }]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">AI Health Assistant</h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-4">
        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.isBot
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-primary-600 text-white ml-auto'
              } ${message.isBot ? 'mr-12' : 'ml-12'} max-w-[80%]`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;