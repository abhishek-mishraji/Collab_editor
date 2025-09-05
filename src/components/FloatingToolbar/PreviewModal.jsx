import React from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

const PreviewModal = ({ original, suggested, action, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="preview-modal">
        <div className="modal-header">
          <h3>AI {action} Suggestion</h3>
        </div>
        
        <div className="modal-content">
          <div className="comparison-grid">
            <div className="comparison-column">
              <h4>Original</h4>
              <div className="text-box original-text">
                {original}
              </div>
            </div>
            
            <div className="comparison-column">
              <h4>Suggested</h4>
              <div className="text-box suggested-text">
                {suggested}
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button
            onClick={onCancel}
            className="cancel-button"
          >
            <FiX className="button-icon" /> Cancel
          </button>
          
          <button
            onClick={onConfirm}
            className="confirm-button"
          >
            <FiCheck className="button-icon" /> Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
