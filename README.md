# Logbook - Advanced Rich Text Editor

A polished, feature-rich Logbook application built with **React 19** and **Tiptap v2**. This project provides a modern writing experience with a modular, highly customizable editor UI.

## ✨ Features

- **Rich Text Editing:** Full support for bold, italic, underline, strike, headings, and more.
- **Advanced Formatting:**
  - 🎨 Text Highlighting
  - 🔗 Intelligent Link Management
  - 📏 Text Alignment (Left, Center, Right, Justify)
  - 📋 Task Lists & Nested Bullet/Ordered Lists
  - 💻 Code Blocks & Inline Code
- **Content Persistence:** Automatically saves your work to `localStorage` so you never lose an entry on refresh.
- **Modern UI Components:** Built with a modular architecture using custom primitives for toolbars, dropdowns, and popovers.
- **Responsive Design:** Optimized for both desktop and mobile writing experiences.
- **Image Support:** Integrated image upload and management (Drag & Drop / Upload).

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Editor Engine:** [Tiptap v2](https://tiptap.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** SCSS & Vanilla CSS
- **Utilities:** DOMPurify (for secure HTML rendering)

## 🛠️ Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bamsemats/logbook.git
   cd logbook
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## 🏗️ Project Structure

- `src/components/tiptap`: Core editor logic and configuration.
- `src/components/tiptap/tiptap-ui`: Modular UI components (Buttons, Dropdowns, Popovers).
- `src/components/tiptap/tiptap-ui-primitive`: Base UI building blocks (Toolbar, Button, Separator).
- `src/hooks`: Custom hooks for editor state, mobile detection, and window sizing.
- `src/lib`: Shared utility functions and Tiptap helpers.

## 📄 License

This project is private and intended for personal/portfolio use.
