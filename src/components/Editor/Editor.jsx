import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import FloatingToolbar from '../FloatingToolbar/FloatingToolbar';

const Editor = ({ onSelectionChange, onContentChange }) => {
  const [selectedText, setSelectedText] = useState('');
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start typing or paste content here...',
      }),
    ],
    content: '<p>Welcome to the collaborative editor with AI assistance!</p>',
    onUpdate: ({ editor }) => {
      // Notify parent component of content changes
      if (onContentChange) {
        onContentChange(editor.getHTML());
      }
    },
    onSelectionUpdate: ({ editor }) => {
      const text = editor.state.selection.content().content.textBetween(0, editor.state.selection.content().content.size);
      setSelectedText(text);
      
      // Notify parent component of selection changes
      if (onSelectionChange) {
        onSelectionChange(text);
      }
    },
  });

  return (
    <div className="editor-wrapper">
      {editor && selectedText && <FloatingToolbar editor={editor} selectedText={selectedText} />}
      <EditorContent 
        editor={editor} 
        className="editor-content" 
      />
    </div>
  );
};

export default Editor;
