<script lang="ts">
    const steps = [
      {
        title: "1. Pull the image",
        code: "docker pull vickydev810/layer8:latest"
      },
      {
        title: "2. Create required volumes",
        description: "This ensures data persists even if the container is removed:",
        code: `docker volume create ollama\ndocker volume create open-webui`
      },
      {
        title: "3. Run the container",
        code: `docker run -d -p 3000:8080 --gpus=all \\
    -v ollama:/root/.ollama \\
    -v open-webui:/app/backend/data \\
    --name open-webui \\
    --restart always \\
    yourname/layer8:latest`
      }
    ];
  </script>
  
  <div class="h-screen w-screen bg-gradient-to-br from-[#05102a] to-[#0b0f28] text-white p-6 overflow-auto flex flex-col items-center">
    <div class="w-full max-w-4xl bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
      <header class="px-6 py-4 bg-slate-800 border-b border-slate-700">
        <h1 class="text-3xl font-bold text-blue-500">How to Run Layer8 from Docker Hub</h1>
        <p class="text-sm text-slate-400 mt-1">
          Follow these steps to run the Layer8 container with persistent volumes.
        </p>
      </header>
  
      <div class="p-6 space-y-6">
        {#each steps as step}
          <div class="bg-slate-900 border-l-4 border-blue-500 rounded-lg p-4">
            <h2 class="text-xl font-semibold text-yellow-400 mb-2">{step.title}</h2>
            {#if step.description}
              <p class="text-slate-300 mb-2">{step.description}</p>
            {/if}
            <pre class="bg-slate-800 text-green-400 p-4 rounded-lg text-sm whitespace-pre-wrap overflow-x-auto">
  {step.code}
            </pre>
          </div>
        {/each}
      </div>
    </div>
  </div>
  