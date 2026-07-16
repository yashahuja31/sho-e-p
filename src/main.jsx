import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const isClerkActive = PUBLISHABLE_KEY && PUBLISHABLE_KEY !== "your_clerk_publishable_key_here" && PUBLISHABLE_KEY.trim() !== ""

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isClerkActive ? (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App isClerkActive={true} />
      </ClerkProvider>
    ) : (
      <App isClerkActive={false} />
    )}
  </StrictMode>,
)
