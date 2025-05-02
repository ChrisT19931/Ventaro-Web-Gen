# Ventaro Web Gen

Ventaro Web Gen is a dynamic template editing application built with React and Next.js. This project allows users to edit templates in real-time, providing a user-friendly interface for customizing headlines, subtexts, and button texts.

## Project Structure

```
Ventaro-Web-Gen
├── src
│   ├── app
│   │   ├── edit
│   │   │   └── [templateId]
│   │   │       └── page.tsx       # Client rendering and editing of templates
│   │   └── templates
│   │       └── [templateId]
│   │           └── page.tsx       # Structure of the template being edited
├── package.json                    # npm configuration file
├── tsconfig.json                   # TypeScript configuration file
└── README.md                       # Project documentation
```

## Features

- **Dynamic Template Editing**: Users can select a template and edit its content in real-time.
- **Live Preview**: Changes made in the input fields are reflected immediately in the preview section.
- **Responsive Design**: The application is designed to be responsive and user-friendly across devices.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd Ventaro-Web-Gen
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.