# Ventaro Web Gen

Ventaro Web Gen is a template-based web development tool designed to help users quickly create and customize websites. This project includes a set of templates that can be easily modified to suit various needs.

## Project Structure

```
Ventaro-Web-Gen
├── templates
│   └── template2
│       ├── index.tsx          # Main component for the template with a welcome message and call-to-action button.
│       └── CustomTemplate.tsx  # Custom React component that accepts props for dynamic content.
└── README.md                  # Documentation for the project.
```

## Templates

### Template 2

- **index.tsx**: This file exports the main component for the template. It currently contains a static layout with a welcome message and a call-to-action button.

- **CustomTemplate.tsx**: This file defines a new React component that accepts the following props:
  - `headline`: string (default: "Build Your Next Project")
  - `subtext`: string (default: "Launch faster with this clean business-focused template.")
  - `ctaText`: string (default: "Get Started")

#### CustomTemplate Layout

- Full-screen height with a white background.
- Centered content vertically.
- Headline styled in black, bold, and large.
- Subtext styled in medium gray and centered.
- CTA button with a blue background, white text, and a hover effect.

## Getting Started

To get started with Ventaro Web Gen, clone the repository and install the necessary dependencies. You can then modify the templates as needed to create your own unique website.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.