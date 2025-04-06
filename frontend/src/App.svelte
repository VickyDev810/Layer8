<script>
  import { onMount } from 'svelte';

  // State
  let query = '';
  let messages = [];
  let isLoading = false;
  let error = null;

  // API Configuration
  const API_URL = 'http://localhost:8000';
  const DEFAULT_PROVIDER = 'gemini';
  const DEFAULT_MODEL = 'gemini-2.0-flash';
  const DEFAULT_TEMPERATURE = 0.7;
  const DEFAULT_MAX_TOKENS = 1000;

  // Add initial greeting
  onMount(() => {
    messages = [
      { 
        role: 'assistant', 
        content: 'Hello! I\'m your secure AI assistant. Your queries will be anonymized before processing to protect sensitive information. How can I help you today?'
      }
    ];
  });

  // Send query to API
  async function sendQuery() {
    if (!query.trim()) return;
    
    const userMessage = query;
    query = '';
    
    // Add user message to chat
    messages = [...messages, { role: 'user', content: userMessage }];
    
    // Show loading indicator
    isLoading = true;
    error = null;
    
    try {
      // Use URL encoding for query parameters
      const encodedQuery = encodeURIComponent(userMessage);
      const url = `${API_URL}/query/${encodedQuery}?provider=${DEFAULT_PROVIDER}&model=${DEFAULT_MODEL}&temperature=${DEFAULT_TEMPERATURE}&max_tokens=${DEFAULT_MAX_TOKENS}`;
      
      // Call API using GET endpoint with query parameters
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Add assistant response (using the deanonymized response)
      messages = [...messages, { role: 'assistant', content: data.deanonymized_response }];
    } catch (err) {
      console.error('Error calling API:', err);
      error = `Error: ${err.message}. Make sure the API server is running at ${API_URL}.`;
    } finally {
      isLoading = false;
    }
  }

  // Handle keyboard shortcuts
  function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendQuery();
    }
  }
</script>

<div class="app-container">
  <header>
    <h1 class="logo">Secure AI Chat</h1>
    <p class="subtle-text">
      Your sensitive information is automatically anonymized before being sent to the LLM.
    </p>
  </header>

  <div class="chat-container">
    {#each messages as message, i}
      <div class="chat-message {message.role === 'user' ? 'user-message' : 'assistant-message'}">
        <p>{@html message.content.replace(/\n/g, '<br>')}</p>
      </div>
    {/each}
    
    {#if isLoading}
      <div class="chat-message assistant-message">
        <p>Thinking...</p>
      </div>
    {/if}
    
    {#if error}
      <div class="chat-message bg-red-900 mr-12">
        <p>{error}</p>
      </div>
    {/if}
  </div>

  <div class="input-container">
    <textarea 
      bind:value={query}
      on:keydown={handleKeydown}
      placeholder="Type your message here... (Press Enter to send)"
      rows="2"
      class="input-field"
    ></textarea>
    <button 
      on:click={sendQuery} 
      disabled={isLoading || !query.trim()}
      class="button"
    >
      Send
    </button>
  </div>
  
  <footer class="mt-8 text-center">
    <p class="subtle-text">
      Using {DEFAULT_PROVIDER} LLM • Model: {DEFAULT_MODEL} • 
      <a href="http://localhost:8000/docs" target="_blank" class="text-blue-400 hover:underline">API Docs</a>
    </p>
  </footer>
</div>
