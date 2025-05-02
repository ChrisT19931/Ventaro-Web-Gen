# Ventaro Web Gen

Ventaro Web Gen is a dynamic template editing application built with Next.js and React. This project allows users to select and edit various templates in real-time, providing a seamless experience for customizing web content.

## Project Structure

```
Ventaro-Web-Gen
├── src
│   ├── app
│   │   ├── templates
│   │   │   └── [templateId]
│   │   │       └── page.tsx
│   │   └── edit
│   │       └── [templateId]
│   │           └── page.tsx
│   └── templates
│       ├── template1
│       │   └── index.tsx
│       ├── template2
│       │   └── index.tsx
│       ├── template3
│       │   └── index.tsx
│       ├── template4
│       │   └── index.tsx
│       └── template5
│           └── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- **Dynamic Template Loading**: Load templates dynamically based on the selected template ID.
- **Real-time Editing**: Edit headline, subtext, and button text with immediate updates to the preview.
- **Responsive Design**: A split-screen layout that adapts to different screen sizes using Tailwind CSS.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd Ventaro-Web-Gen
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000/edit/template1` (or any other template ID) to start editing.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.