import './tiptap.css';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import StarterKit from '@tiptap/starter-kit';
import { Image } from "@tiptap/extension-image"
import { TaskItem } from "@tiptap/extension-task-item"
import { TaskList } from "@tiptap/extension-task-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { useState, useEffect, useCallback } from 'react';
import DOMPurify from 'dompurify';
import { Trash2, Edit3 } from 'lucide-react';

// --- Custom Extensions ---
import { Link } from "../tiptap-extension/link-extension"
import { Selection } from "../tiptap-extension/selection-extension"
import { TrailingNode } from "../tiptap-extension/trailing-node-extension"
import { ImageUploadNode } from "../tiptap-node/image-upload-node/image-upload-node-extension"

// --- UI Primitives ---
import { Spacer } from "../tiptap-ui-primitive/spacer/spacer"
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "../tiptap-ui-primitive/toolbar/toolbar"

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "../tiptap-ui/heading-dropdown-menu/heading-dropdown-menu"
import { ImageUploadButton } from "../tiptap-ui/image-upload-button/image-upload-button"
import { ListDropdownMenu } from "../tiptap-ui/list-dropdown-menu/list-dropdown-menu"
import { NodeButton } from "../tiptap-ui/node-button/node-button"
import { HighlightPopover } from "../tiptap-ui/highlight-popover/highlight-popover"
import { LinkPopover } from "../tiptap-ui/link-popover/link-popover"
import { MarkButton } from "../tiptap-ui/mark-button/mark-button"
import { TextAlignButton } from "../tiptap-ui/text-align-button/text-align-button"
import { UndoRedoButton } from "../tiptap-ui/undo-redo-button/undo-redo-button"

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "../../lib/tiptap-utils"

// --- Hooks ---
import { useMobile } from "../../hooks/use-mobile"

// --- Styles for nodes ---
import "../tiptap-node/code-block-node/code-block-node.scss"
import "../tiptap-node/list-node/list-node.scss"
import "../tiptap-node/image-node/image-node.scss"
import "../tiptap-node/paragraph-node/paragraph-node.scss"

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  TextStyle,
  Color,
  Underline,
  Subscript,
  Superscript,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  TaskList,
  TaskItem.configure({ nested: true }),
  Highlight.configure({ multicolor: true }),
  Image,
  Typography,
  Selection,
  ImageUploadNode.configure({
    accept: "image/*",
    maxSize: MAX_FILE_SIZE,
    limit: 3,
    upload: handleImageUpload,
    onError: (error: any) => console.error("Upload failed:", error),
  }),
  TrailingNode,
  Link.configure({ openOnClick: false }),
]

const defaultContent = `<p><b>Welcome!</b><br> Write your message here</p>`

const MenuBar = () => {
  const { editor } = useCurrentEditor()
  const isMobile = useMobile()

  if (!editor) {
    return null
  }

  return (
    <Toolbar variant="fixed" data-variant="fixed">
      <Spacer />
      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3]} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
        {!isMobile && <NodeButton type="codeBlock" />}
        {!isMobile && <NodeButton type="blockquote" />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        {!isMobile && <MarkButton type="strike" />}
        {!isMobile && <MarkButton type="code" />}
        <MarkButton type="underline" />
        <HighlightPopover />
        <LinkPopover />
      </ToolbarGroup>

      {!isMobile && (
        <>
          <ToolbarSeparator />
          <ToolbarGroup>
            <MarkButton type="superscript" />
            <MarkButton type="subscript" />
          </ToolbarGroup>
        </>
      )}

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        {!isMobile && <TextAlignButton align="justify" />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text={isMobile ? "" : "Add"} />
      </ToolbarGroup>
      <Spacer />
    </Toolbar>
  )
}

const EditorControls = ({ 
  editingIndex, 
  onSave, 
  onCancel,
  entries
}: { 
  editingIndex: number | null, 
  onSave: (html: string) => void,
  onCancel: () => void,
  entries: any[]
}) => {
  const { editor } = useCurrentEditor();

  useEffect(() => {
    if (editor && editingIndex !== null) {
      editor.commands.setContent(entries[editingIndex].currentForm);
      editor.commands.focus('end');
    }
  }, [editingIndex, editor, entries]);

  if (!editor) return null;

  const handleAction = () => {
    const html = editor.getHTML();
    onSave(html);
    editor.commands.setContent(defaultContent);
  };

  return (
    <div className='editor-controls'>
      <button className='submit-button' onClick={handleAction}>
        {editingIndex !== null ? 'Update Entry' : 'Submit Entry'}
      </button>
      {editingIndex !== null && (
        <button className='submit-button cancel' onClick={() => {
          onCancel();
          editor.commands.setContent(defaultContent);
        }}>
          Cancel Edit
        </button>
      )}
    </div>
  );
};

const Tiptap = () => {
  const [submittedForms, setSubmittedForms] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('logbook-entries');
    if (savedEntries) {
      setSubmittedForms(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('logbook-entries', JSON.stringify(submittedForms));
  }, [submittedForms]);

  // Load last session draft if any
  const savedDraft = localStorage.getItem('logbook-content');
  const initialContent = savedDraft ? (savedDraft.startsWith('{') || savedDraft.startsWith('[') ? JSON.parse(savedDraft) : savedDraft) : defaultContent;

  const handleSaveEntry = useCallback((html: string) => {
    const sanitizedHtml = DOMPurify.sanitize(html);
    if (editingIndex !== null) {
      const updatedForms = [...submittedForms];
      updatedForms[editingIndex] = { currentForm: sanitizedHtml };
      setSubmittedForms(updatedForms);
      setEditingIndex(null);
    } else {
      setSubmittedForms(prev => [...prev, { currentForm: sanitizedHtml }]);
    }
  }, [editingIndex, submittedForms]);

  const deleteEntry = useCallback((index: number) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedForms = submittedForms.filter((_, i) => i !== index);
      setSubmittedForms(updatedForms);
      if (editingIndex === index) setEditingIndex(null);
      else if (editingIndex !== null && editingIndex > index) setEditingIndex(editingIndex - 1);
    }
  }, [editingIndex, submittedForms]);

  return (
    <div className='logbook-div'>
      <EditorProvider 
        editorContainerProps={{ className: 'editor-container' }}
        slotBefore={<MenuBar />} 
        extensions={extensions} 
        content={initialContent}
        onUpdate={({ editor }) => {
          const json = editor.getJSON();
          localStorage.setItem('logbook-content', JSON.stringify(json));
        }}
        slotAfter={
          <EditorControls 
            editingIndex={editingIndex} 
            onSave={handleSaveEntry}
            onCancel={() => setEditingIndex(null)}
            entries={submittedForms}
          />
        }
      >
      </EditorProvider>

      <div className='output-container'>
        <h3>
          Entries 
          {editingIndex !== null && <span className='edit-mode-indicator'>Editing Entry #{editingIndex + 1}</span>}
        </h3>
        {submittedForms.length === 0 ? (
          <p style={{color: 'var(--color-text-muted)', textAlign: 'center'}}>No entries yet. Start writing above!</p>
        ) : (
          [...submittedForms].reverse().map((_, revIndex) => {
            const index = submittedForms.length - 1 - revIndex;
            const entryObject = submittedForms[index];
            return (
              <div className='submitted-form-div' key={index}>
                <div className='entry-actions'>
                  <button className='action-btn' title='Edit' onClick={() => setEditingIndex(index)}>
                    <Edit3 size={16} />
                  </button>
                  <button className='action-btn delete' title='Delete' onClick={() => deleteEntry(index)}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <div dangerouslySetInnerHTML={{__html: entryObject.currentForm}}></div>
              </div>
            );
          })
        )}
      </div>
    </div>
  )
}

export default Tiptap
