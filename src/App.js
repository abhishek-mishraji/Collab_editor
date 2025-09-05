import React, { useState } from 'react';
import Editor from './components/Editor/Editor';
import ChatSidebar from './components/ChatSidebar/ChatSidebar';
// CSS import removed to simplify

function App() {
  // State for the app
  const [, setSelectedText] = useState('');
  const [, setEditorContent] = useState('');

  const handleSelectionChange = (text) => {
    setSelectedText(text);
  };

  const handleContentChange = (content) => {
    setEditorContent(content);
  };

  const handleApplyEdit = (editSuggestion) => {
    // This would normally update the editor content
    console.log('Applying edit suggestion:', editSuggestion);
    alert('Edit suggestion would be applied here in a real implementation');
  };

  // Inline styles to replace CSS
  const appStyle = {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f8f9fa'
  };

  const mainEditorStyle = {
    flex: 1,
    padding: '1rem'
  };

  const appTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  };

  const editorContainerStyle = {
    height: 'calc(100% - 3rem)',
    border: '1px solid #ddd',
    borderRadius: '4px'
  };

  const sidebarStyle = {
    width: '33.333%',
    height: '100vh',
    borderLeft: '1px solid #ddd',
    backgroundColor: '#f8f9fa'
  };

  return (
    <div style={appStyle}>
      <div style={mainEditorStyle}>
        <h1 style={appTitleStyle}>Collaborative Editor</h1>
        <div style={editorContainerStyle}>
          <Editor 
            onSelectionChange={handleSelectionChange} 
            onContentChange={handleContentChange}
          />
        </div>
      </div>
      
      <div style={sidebarStyle}>
        <ChatSidebar onApplyEdit={handleApplyEdit} />
      </div>
    </div>
  );
}

export default App;
