# TODO List - Logbook Project Improvements

## 1. Basic App Improvements
- [x] **Configure Path Aliases:** Create `jsconfig.json` to support `@/` path aliases for cleaner imports.
- [x] **Content Persistence:** Implement LocalStorage saving to prevent data loss on page refresh.
- [x] **Refactor Entry Submission:** Improve the way submitted entries are displayed, matching the editor's styling and typography. Added Edit/Delete functionality.
- [ ] **Fix List Mark Preservation:** Address the "TODO" in `tiptap.jsx` regarding marks not being preserved when attributes are kept in bullet/ordered lists.

## 2. Text Editor UI Features (Tiptap Integration)
- [x] **Migrate to Advanced UI Components:** Transition from the manual `MenuBar` in `tiptap.jsx` to the modular components in `src/components/tiptap/tiptap-ui`.
- [x] **Link Management:** Enable the `LinkPopover` and `Link` extension for rich-text links.
- [x] **Highlighting:** Enable the `HighlightPopover` for text highlighting.
- [x] **Image Support:** Implement image uploads and resizing using the `ImageUploadNode` and `Image` extension.
- [x] **Text Alignment:** Add text alignment controls (left, center, right, justify).
- [ ] **Floating/Bubble Menus:** Re-enable and style the `FloatingMenu` and `BubbleMenu` for better UX.

## 3. Design & Positioning (UI/UX)
- [ ] **Sticky Toolbar:** Make the editor toolbar sticky so it stays visible while writing long entries.
- [x] **Dark Mode Support:** Implement a theme toggle (Sun/Moon) and dark mode styling.
- [ ] **Enhanced Animations:** Utilize `_keyframe-animations.scss` for smooth transitions in dropdowns and popovers.
- [ ] **Mobile Optimization:** Ensure the toolbar and editor are fully responsive, potentially hiding some options on small screens (using the `useMobile` hook).
- [x] **Visual Polishing:** Add subtle shadows, transitions, and hover effects to buttons and containers to make the app feel "alive".
