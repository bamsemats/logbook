import Tiptap from '../tiptap/tiptap';
import './logbook.css';
import {useState, useEffect} from 'react';

export default function Logbook() {
  return (
    <div className='logbook-container'>
        <h2>Text Editor</h2>
        <Tiptap />
    </div>
  )
}