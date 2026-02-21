📝 Notes App — Full CRUD with Tag Filtering & Search

A fully functional Notes Application built using Vanilla JavaScript, HTML, and CSS, featuring complete CRUD operations, tag-based filtering, live search, and persistent storage using localStorage.

This project demonstrates solid frontend architecture principles including state management, event delegation, dynamic rendering, and identity-based updates using unique IDs.

🚀 Live Features
✅ Create Notes
  Add title, content, tag, and automatic timestamp
  Modal-based input system
  Clean UI interaction

✅ Edit Notes
  Click any note to open it in edit mode
  Updates existing note without duplication
  ID-based identity system (not index-based)

✅ Delete Notes
  Safe deletion using unique note IDs
  Works correctly even during filtering or searching
  Prevents event bubbling issues

✅ Tag Filtering
  Filter notes by category:
  Work
  Personal
  Ideas
  Reminder
  All
  Dropdown-based filter UI
  State-driven rendering system

✅ Live Search
  Real-time search as the user types
  Case-insensitive matching
  Searches both title and content
  Works alongside tag filtering

✅ Persistent Storage
  Notes saved to localStorage
  Data safely loaded using try/catch
  Automatically restores on refresh

🧠 Architecture Overview

This application is built around a simple but scalable state-driven model:

Application State
  let notes = [];
  let selectedFilter = "all";
  let searchQuery = "";
  let editingIndex = null; // stores note ID during edit

The UI never directly mutates the DOM permanently.
Instead:
State → render() → DOM
Every interaction updates state first, then re-renders the UI.


🏗 Core Concepts Implemented

1️⃣ Unique ID System (Professional-Grade Fix)

  Each note is assigned a unique ID:
  id: Date.now()
  All editing and deletion operations rely on ID comparison:
  notes = notes.filter(n => n.id !== note.id);
  
  This prevents:
  Index mismatch bugs
  Filtering/editing conflicts
  Incorrect deletions


2️⃣ Event Delegation

  Instead of attaching listeners to each note:
  
  notesContainer.addEventListener('click', (e) => {
    const box = e.target.closest('.notes-box');
  });
  
  Benefits:
  Works with dynamically rendered elements
  Cleaner memory usage
  Scalable approach


3️⃣ Combined Filtering Logic

  Filtering logic supports both:
  Tag filtering
  Text search
  
  const filteredNotes = notes.filter(note => {
    if (selectedFilter !== "all" && note.tag !== selectedFilter) {
      return false;
    }
    const searchableText = `${note.title} ${note.content}`.toLowerCase();
    return searchableText.includes(searchQuery);
  });
  
  This demonstrates layered filtering logic similar to real production applications.


4️⃣ Defensive Storage Handling

  Safe JSON parsing:
  try {
    notes = JSON.parse(localStorage.getItem("notes")) || [];
  } catch {
    notes = [];
  }
  Prevents app crashes due to corrupted storage.



🧩 Technical Stack
  HTML5
  CSS3
  Vanilla JavaScript (ES6+)
  LocalStorage API
  Font Awesome (icons)
  No frameworks used — intentionally built with pure JavaScript to demonstrate core fundamentals.


🎯 What This Project Demonstrates
This project showcases:
DOM manipulation
  Event delegation
  State management
  Functional array methods (filter, map, find)
  Identity-based data updates
  Clean separation between logic and rendering
  Debugging and refactoring for stability


📁 Project Structure
  /index.html
  /style.css
  /script.js
  README.md
  

The JavaScript file handles:
  State
  Event listeners
  Storage logic
  Rendering logic
  Filtering logic
  

🔮 Future Improvements
  Sorting by date
  Reminder prioritization
  Highlight matched search terms
  Debounced search input
  Dark mode
  Modular file structure
  Migration to component-based architecture
