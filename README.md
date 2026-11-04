# 📝 To-Do List App

A simple, responsive to-do list web app built with vanilla **HTML, CSS, and JavaScript** (no frameworks, no dependencies). Tasks support due dates, completion tracking, and persist locally using `localStorage`.

## Features

- ➕ Add tasks with an optional due date
- ✅ Mark tasks as complete / incomplete
- 🗑️ Delete individual tasks
- 🧹 Bulk-clear completed tasks
- ⏰ Automatic overdue highlighting for unfinished tasks past their due date
- 📅 Tasks auto-sort by due date (undated tasks last)
- 💾 Data persists across page reloads via browser `localStorage` (no backend/database needed)
- 📱 Responsive layout

## Tech Stack

- HTML5
- CSS3 (flexbox, animations)
- JavaScript (ES6+, DOM manipulation, `localStorage` API)

## Project Structure

```
todo-list-app/
├── index.html   # Page structure
├── style.css    # Styling
├── script.js    # App logic (add/complete/delete/sort/persist)
└── README.md
```

## Getting Started

No build step or dependencies required.

1. Clone the repo:
   ```bash
   git clone https://github.com/<your-username>/todo-list-app.git
   ```
2. Open `index.html` in any browser.

That's it — the app runs entirely client-side.

## Possible Future Improvements

- Task priority levels
- Categories / tags
- Edit existing task text
- Dark mode toggle

## Author

Eric Huo
