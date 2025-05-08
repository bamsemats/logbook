import Tiptap from '../tiptap/tiptap';
import './logbook.css';
import {useState, useEffect} from 'react';

export default function Logbook() {
  return (
    <div className='logbook-container'>
        <h2>This is an App!</h2>
        <Tiptap />
    </div>
  )
}