# Voice Visual AI Frontend

A modern Next.js 14 App Router application that provides an AI-powered interface for voice and text queries with visual responses.

## Features

- 🎤 **Voice Input**: Use Web Speech API to speak your queries
- ⌨️ **Text Input**: Type queries in a textarea with Enter key support
- 🖼️ **Visual Responses**: Display text responses and base64-encoded images
- ⚡ **Real-time State Management**: Redux Toolkit for efficient state management
- 🎨 **Modern UI**: Clean, centered layout with Tailwind CSS
- 🌓 **Dark Mode**: Automatic dark mode support
- 📱 **Responsive Design**: Works on all device sizes
- ⏳ **Loading States**: Visual feedback during API calls
- ❌ **Error Handling**: User-friendly error messages

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Voice Recognition**: Web Speech API
- **Backend**: Flask (http://localhost:5000/query)

## Components

### ChatBox
- Textarea for typing queries
- Send button (enabled when text is present)
- Clear button to reset the form
- Enter key support for quick submission
- Loading state during API calls

### MicButton
- Voice recognition using Web Speech API
- Visual feedback during recording
- Automatically fills the query textarea with transcribed text
- Browser compatibility detection

### ResponseBox
- Displays text responses from the backend
- Shows base64-encoded images when available
- Loading spinner during API calls
- Error message display with clear formatting
- Empty state with instructions

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Flask backend running on http://localhost:5000/query

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Backend API Contract

The frontend expects a Flask backend running at `http://localhost:5000/query` that accepts POST requests with the following format:

**Request:**
```json
{
  "query": "Your question here"
}
```

**Response:**
```json
{
  "text": "Response text here",
  "image": "base64_encoded_image_string (optional)"
}
```

## Project Structure

```
voice-visual-ai-frontend/
├── app/
│   ├── layout.tsx          # Root layout with Redux Provider
│   ├── page.tsx            # Main page with all components
│   ├── globals.css         # Global styles
│   └── fonts/              # Custom fonts
├── components/
│   ├── ChatBox.tsx         # Text input component
│   ├── MicButton.tsx       # Voice input component
│   └── ResponseBox.tsx     # Response display component
├── lib/
│   └── redux/
│       ├── store.ts        # Redux store configuration
│       ├── querySlice.ts   # Query state management
│       ├── hooks.ts        # Typed Redux hooks
│       └── StoreProvider.tsx # Client-side Redux provider
└── package.json
```

## Usage

1. **Text Input**: Type your query in the textarea and click "Send" or press Enter
2. **Voice Input**: Click "Click to Speak" and speak your query
3. **View Response**: The response will appear in the ResponseBox with text and/or image
4. **Clear**: Click "Clear" to reset the form and response

## Browser Support

- Chrome/Edge: Full support including voice recognition
- Firefox: Full support except voice recognition
- Safari: Full support including voice recognition (macOS/iOS)

## Development

The application uses:
- **Server Components** for optimal performance
- **Client Components** for interactive features (marked with 'use client')
- **TypeScript** for type safety
- **ESLint** for code quality
- **Tailwind CSS** for styling

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## License

MIT
