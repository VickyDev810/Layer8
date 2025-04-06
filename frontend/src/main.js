import './app.css'
import App from './App.svelte'

// Create the app with Svelte 3-compatible instantiation
const app = new App({
  target: document.getElementById('app')
})

export default app
