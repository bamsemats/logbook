# Logbook Project Context

## Project Overview
A React-based Logbook application featuring a rich-text editor built with Tiptap. The project provides a polished, professional writing experience with advanced formatting and persistent storage.

## Technical Stack
- **Frontend:** React 19, TypeScript
- **Editor:** Tiptap v2 (Starter Kit + modular UI components)
- **Styling:** SCSS, CSS Variables (Modern "Paper & Ink" palette)
- **Icons:** Lucide React
- **State:** React Hooks + LocalStorage Persistence

## Key Architecture Changes
- **TypeScript Integration:** Migrated core editor logic to `.tsx` and configured `tsconfig.json` for CRA compatibility.
- **Import Strategy:** Uses strictly relative imports to ensure compatibility with standard Create React App build pipelines.
- **Modular UI:** Replaced manual MenuBar with high-level components from `src/components/tiptap-ui`.
- **Theme System:** Consolidated all styling variables into `src/index.css` using a professional ivory/charcoal/navy palette.

## Key Features
- **Persistent Entries:** All logs are saved to `localStorage`.
- **Edit/Delete:** Users can modify or remove previously submitted logs.
- **Mobile Responsive:** Toolbar wraps naturally on small screens; paddings adjust for touch targets.
- **Draft Protection:** Current editor content is auto-saved as a draft.

## Known Issues / TODOs
- Mark preservation in lists is still a TODO in the Tiptap configuration.
- Sticky toolbar logic is implemented via CSS but may need further refinement for specific mobile browsers.
