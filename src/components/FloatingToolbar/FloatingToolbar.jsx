import React, { useState } from 'react';
import { FiEdit2, FiMaximize2, FiMinimize2, FiTable } from 'react-icons/fi';
import { callAIApi } from '../../api/aiApi';
import PreviewModal from './PreviewModal';

const FloatingToolbar = ({ editor, selectedText }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState({ original: '', suggested: '' });
  const [isLoading, setIsLoading] = useState(false);

  if (!editor || !selectedText) {
    return null;
  }

  const handleAIEdit = async (action) => {
    if (!selectedText) return;
    
    setIsLoading(true);
    
    try {
      const prompt = `${action} the following text: ${selectedText}`;
      const response = await callAIApi(prompt);
      
      setPreviewData({
        original: selectedText,
        suggested: response.editSuggestion || response.text,
        action
      });
      
      setShowPreview(true);
    } catch (error) {
      console.error('Error calling AI API:', error);
      alert('Failed to process your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmEdit = () => {
    if (editor && previewData.suggested) {
      editor.commands.deleteSelection();
      editor.commands.insertContent(previewData.suggested);
    }
    setShowPreview(false);
  };

  const getSelectionCoords = () => {
    if (!editor) return { top: 0, left: 0 };
    
    const { view } = editor;
    const { from } = view.state.selection;
    const start = view.coordsAtPos(from);
    
    return {
      top: start.top - 50,
      left: start.left,
    };
  };

  const coords = getSelectionCoords();

  return (
    <>
      {/* Floating Toolbar */}
      <div 
        className="floating-toolbar"
        style={{
          top: `${coords.top}px`,
          left: `${coords.left}px`,
        }}
      >
        <button
          onClick={() => handleAIEdit('Edit')}
          disabled={isLoading}
          className="toolbar-button"
          title="Edit with AI"
        >
          <FiEdit2 size={18} />
        </button>
        
        <button
          onClick={() => handleAIEdit('Shorten')}
          disabled={isLoading}
          className="toolbar-button"
          title="Shorten"
        >
          <FiMinimize2 size={18} />
        </button>
        
        <button
          onClick={() => handleAIEdit('Lengthen')}
          disabled={isLoading}
          className="toolbar-button"
          title="Lengthen"
        >
          <FiMaximize2 size={18} />
        </button>
        
        <button
          onClick={() => handleAIEdit('Convert to table')}
          disabled={isLoading}
          className="toolbar-button"
          title="Convert to Table"
        >
          <FiTable size={18} />
        </button>
        
        {isLoading && (
          <span className="loading-text">Processing...</span>
        )}
      </div>
      
      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal
          original={previewData.original}
          suggested={previewData.suggested}
          action={previewData.action}
          onConfirm={handleConfirmEdit}
          onCancel={() => setShowPreview(false)}
        />
      )}
    </>
  );
};

export default FloatingToolbar;
