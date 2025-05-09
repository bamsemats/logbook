import './tiptap.css';
import { EditorProvider, FloatingMenu, BubbleMenu, useCurrentEditor } from '@tiptap/react';
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import StarterKit from '@tiptap/starter-kit';
import { Bold, ChevronDown, CodeXml, CornerDownLeft, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, List, ListOrdered, LucideSubscript, LucideSuperscript, LucideUnderline, Pilcrow, Redo2, SeparatorHorizontal, SquareCode, Strikethrough, TextQuote, Undo2 } from 'lucide-react';
import {useState} from 'react';
import DOMPurify from 'dompurify';

// define your extension array
const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Underline,
  Subscript,
  Superscript
]

const content = '<p>Hey! Write something..!</p>'

function handleClickHeadingDropdown() {
  const headingDropDownDiv = document.querySelector('.heading-dropdown-content');
  headingDropDownDiv.classList.toggle('show-dropdown');
}

const MenuBar = () => {
  const { editor } = useCurrentEditor()
  
  const currentHeading = editor.isActive('heading', {level: 2}) ? 'Heading2' : editor.isActive('heading', {level: 3}) ? 'Heading3' : editor.isActive('heading', {level: 4}) ? 'Heading4' : editor.isActive('heading', {level: 5}) ? 'Heading5' : editor.isActive('heading', {level: 6}) ? 'Heading6' : 'Heading1';
  
  const headingComponents = {
    Heading1: <Heading1 style={{opacity: '0.8'}}/>,
    Heading2: <Heading2 style={{opacity: '0.8'}}/>,
    Heading3: <Heading3 style={{opacity: '0.8'}}/>,
    Heading4: <Heading4 style={{opacity: '0.8'}}/>,
    Heading5: <Heading5 style={{opacity: '0.8'}}/>,
    Heading6: <Heading6 style={{opacity: '0.8'}}/>,
  };
  if (!editor) {
    return null
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <div className='button-group-div1'>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''}
          data-title='Bold'
        >
          <Bold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
          data-title='Italic'
        >
          <Italic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleUnderline()
              .run()
          }
          className={editor.isActive('underline') ? 'is-active' : ''}
          data-title='Underline'
        >
          <LucideUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'is-active' : ''}
          data-title='Strike'
        >
          <Strikethrough />
        </button>
           <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
          data-title='Paragraph'
        >
          <Pilcrow />
        </button>
          <div className='heading-dropdown'
        >
          <button 
            className='heading-dropdown-button'
            // content={editor.isActive('heading') ? `<${headingDropdownVar} />` : <Heading1 />}
            onClick={handleClickHeadingDropdown}
            style={{paddingRight: '0'}}
            data-title='Heading'
          >
            {headingComponents[currentHeading] ||<Heading1 style={{opacity: '0.8'}}/>}<ChevronDown className='chevron-down'/>
          </button>
          <div className='heading-dropdown-content'>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
              <Heading1 />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
              <Heading2 />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            >
              <Heading3 />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
            >
              <Heading4 />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
              className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
            >
              <Heading5 />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
              className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
            >
              <Heading6 />
            </button>
          </div>
        </div>
        </div>
        <div className='button-group-div2'>
        <button
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleSuperscript()
              .run()
          }
          className={editor.isActive('superscript') ? 'is-active' : ''}
          data-title='Superscript'
        >
          <LucideSuperscript />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleSubscript()
              .run()
          }
          className={editor.isActive('subscript') ? 'is-active' : ''}
          data-title='Subscript'
        >
          <LucideSubscript />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={editor.isActive('code') ? 'is-active' : ''}
          data-title='Code'
        >
          <CodeXml />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
          data-title='Code Block'
        >
          <SquareCode />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          data-title='Bullet List'
        >
          <List />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
          data-title='Numbered List'
        >
          <ListOrdered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
          data-title='Block Quote'
        >
          <TextQuote />
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}
          data-title='Horizontal Rule'>
          <SeparatorHorizontal />
        </button>
        </div>
        <div className='button-group-div3'>
        <button 
          onClick={() => editor.chain().focus().setHardBreak().run()}
          data-title='Hard Break'
        >
          <CornerDownLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
          data-title='Undo'
        >
          <Undo2 />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
          data-title='Redo'
        >
          <Redo2 />
        </button>
        {/* <button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
          style={{color: '#958DF1'}}
        >
          Purple
        </button> */}
        </div>
      </div>
    </div>
  )
}



const Tiptap = () => {
  const [submittedForms, setSubmittedForms] = useState([]);
  function handleSubmit() {
    const currentFormElement = document.querySelector('.tiptap');
    const currentForm = DOMPurify.sanitize(currentFormElement.innerHTML);
    setSubmittedForms(prev => [
      ...prev,
      {currentForm}
    ])
  }
  console.log(submittedForms);
  return (
    <div className='logbook-div'>
    <EditorProvider className='editor-container' slotBefore={<MenuBar />} extensions={extensions} content={content}>
      
    </EditorProvider>
    <button className='submit-button' onClick={handleSubmit}>Submit</button>
    <div className='output-container'>
      <h3>Output</h3>
      {submittedForms.map((entryObject, index) => 
        <div className='submitted-form-div' key={index} dangerouslySetInnerHTML={{__html: entryObject.currentForm}}></div>
      )}
    </div>
    </div>
  )
}

export default Tiptap

{/* <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu> */}