<script lang="ts">
    import { onMount } from 'svelte';
  
    let query = '';
    let messages = [];
    let isLoading = false;
    let error: string | null = null;
    let thinkingInfo: {
      original: string;
      anonymized: string;
      report: string;
    } | null = null;
  
    const API_URL = 'http://192.168.210.38:8000';
    const DEFAULT_PROVIDER = 'gemini';
    const DEFAULT_MODEL = 'gemini-2.0-flash';
    const DEFAULT_TEMPERATURE = 0.7;
    const DEFAULT_MAX_TOKENS = 1000;
  
    onMount(() => {
      messages = [
        {
          role: 'assistant',
          content:
            "Hello! I'm your secure AI assistant. Your queries will be anonymized before processing to protect sensitive information. How can I help you today?"
        }
      ];
    });
  
    async function sendQuery() {
      if (!query.trim()) return;
  
      const userMessage = query;
      query = '';
  
      messages = [...messages, { role: 'user', content: userMessage }];
      isLoading = true;
      error = null;
      thinkingInfo = null;
  
      try {
        const encodedQuery = encodeURIComponent(userMessage);
        const url = `${API_URL}/query/${encodedQuery}?provider=${DEFAULT_PROVIDER}&model=${DEFAULT_MODEL}&temperature=${DEFAULT_TEMPERATURE}&max_tokens=${DEFAULT_MAX_TOKENS}`;
  
        const response = await fetch(url);
        if (!response.ok) throw new Error(`API returned status ${response.status}`);
  
        const data = await response.json();
  
        // Temporary anonymization display
        thinkingInfo = {
          original: data.original_query,
          anonymized: data.anonymized_query,
          report: data.formatted_report
        };
  
        // Simulate brief "thinking" delay
        await new Promise((resolve) => setTimeout(resolve, 5000));
  
        // Final assistant response
        messages = [
          ...messages,
          {
            role: 'assistant',
            content: data.deanonymized_response
          }
        ];
      } catch (err: any) {
        console.error('Error calling API:', err);
        error = `Error: ${err.message}. Make sure the API server is running at ${API_URL}.`;
      } finally {
        isLoading = false;
        thinkingInfo = null;
      }
    }
  
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendQuery();
      }
    }
  </script>
  
  <!-- UI -->
  <div class="min-h-screen w-screen mx-auto bg-gradient-to-br from-[#05102a] to-[#0b0f28] px-4 py-12 text-white">
    <header class="mb-6">
      <h2 class="text-3xl font-bold">Layer8</h2>
      <p class="text-sm text-gray-400">
        Your sensitive information is automatically anonymized before being sent to the LLM.
      </p>
    </header>
  
    <!-- Chat Messages -->
    <div class="space-y-4 mb-4">
      {#each messages as message}
        <div class="chat-message {message.role === 'user' ? 'text-right text-blue-300' : 'text-left text-white'}">
          <p class="bg-gray-800 rounded-md p-3 inline-block max-w-xl">
            {@html message.content.replace(/\n/g, '<br>')}
          </p>
        </div>
      {/each}
  
      <!-- Thinking Info -->
      {#if thinkingInfo}
        <div class="bg-gray-800 text-yellow-100 p-4 rounded-md space-y-2 text-sm">
          <p><strong>🔒 Anonymizing your message securely...</strong></p>
          <p><span class="font-semibold">Original:</span> {thinkingInfo.original}</p>
          <p><span class="font-semibold">Anonymized:</span> {thinkingInfo.anonymized}</p>
          <p><span class="font-semibold">Report:</span> {thinkingInfo.report}</p>
        </div>
      {:else if isLoading}
        <div class="text-left text-white">Thinking...</div>
      {/if}
  
      {#if error}
        <div class="text-red-500 bg-red-900 p-3 rounded">{error}</div>
      {/if}
    </div>
  
    <!-- Input -->
    <div class="flex flex-col gap-4 md:flex-row">
      <textarea
        bind:value={query}
        on:keydown={handleKeydown}
        placeholder="Type your message here... (Enter to send)"
        rows="2"
        class="w-full p-3 rounded-md bg-gray-900 text-white resize-none"
      ></textarea>
      <button
        on:click={sendQuery}
        class="bg-blue-500 hover:bg-blue-400 text-gray-900 font-bold px-6 py-3 rounded-lg shadow-md transition disabled:opacity-40"
        disabled={isLoading || !query.trim()}
      >
        Send
      </button>
    </div>
  
    <!-- Footer -->
    <footer class="mt-8 text-center text-sm text-gray-400">
      Using {DEFAULT_PROVIDER} • Model: {DEFAULT_MODEL} •
      <a
        href="http://localhost:8000/docs"
        class="text-blue-400 hover:underline"
        target="_blank"
        >API Docs</a
      >
    </footer>
  </div>
  