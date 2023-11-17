import React, { useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState, convertFromRaw } from 'draft-js';

const WysiwygEditor = ({ editorState, onEditorStateChange, initialContent, disabled = false }) => {

  useEffect(() => {
    // Actualiza el estado del editor con el contenido inicial cuando initialContent cambia
    if (initialContent) {
      const contentState = convertFromRaw(initialContent);
      onEditorStateChange(EditorState.createWithContent(contentState));
    }
  }, [initialContent, onEditorStateChange]);

  return (
    <Editor
      editorState={editorState || initialEditorState}
      onEditorStateChange={onEditorStateChange}
      readOnly={disabled}
    />
  );
};

export default WysiwygEditor;
