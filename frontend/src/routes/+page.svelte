<script lang="ts">
    import Assistant from '$lib/components/chat/Assistant.svelte';
    import GettingStarted from '$lib/components/section/GettingStarted.svelte';
    import PrivateLlm from '$lib/components/ui/PrivateLlm.svelte';
    
  
    function handleGetStartedClick() {
      document.getElementById('chat-assistant')?.scrollIntoView({ behavior: 'smooth' });
    }
  </script>
  
  <GettingStarted
    onClickHandler={handleGetStartedClick}
    securityImage="src/assets/images/aiImage.svg"
  />
  
  <section id="chat-assistant" class="h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#05102a] to-[#0b1638]">
    <h1 class="text-white font-serif pb-5 text-5xl">Layer8 Secure Middleware</h1>
    <div class="max-w-4/5 w-[70%]">
      <Assistant />
    </div>
  </section>
  
  <PrivateLlm />