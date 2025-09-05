import React, { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import { callAIApi } from '../../api/aiApi';

const ChatSidebar = ({ onApplyEdit }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { id: Date.now(), type: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Call AI API
      const response = await callAIApi(input);
      
      // Add AI response to chat
      const aiMessage = { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: response.text,
        hasEditSuggestion: response.editSuggestion !== null,
        editSuggestion: response.editSuggestion
      };
      
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error calling AI API:', error);
      setMessages((prevMessages) => [
        ...prevMessages, 
        { id: Date.now() + 1, type: 'ai', text: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleApplyEdit = (editSuggestion) => {
    if (onApplyEdit) {
      onApplyEdit(editSuggestion);
    }
  };

  return (
    <div className="chat-sidebar">
      <div className="chat-header">
        <h2>AI Assistant</h2>
      </div>
      
      {/* Messages Area */}
      <div className="messages-container">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.type === 'user' ? 'user-message' : 'ai-message'}`}
          >
            <div 
              className={`message-content ${
                message.type === 'user' 
                  ? 'user-message-content' 
                  : 'ai-message-content'
              }`}
            >
              <p>{message.text}</p>
              
              {message.hasEditSuggestion && (
                <button
                  onClick={() => handleApplyEdit(message.editSuggestion)}
                  className="apply-edit-btn"
                >
                  Apply Edit
                </button>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="loading-indicator">
            <p>AI is thinking...</p>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask the AI assistant..."
            className="chat-input"
            rows="3"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className={`send-button ${!input.trim() || isLoading ? 'disabled' : ''}`}
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
