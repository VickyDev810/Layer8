<script lang="ts">
    import Assistant from '$lib/components/chat/Assistant.svelte';
    import GettingStarted from '$lib/components/section/GettingStarted.svelte';
  
    function handleGetStartedClick() {
      document.getElementById('chat-assistant')?.scrollIntoView({ behavior: 'smooth' });
    }
  </script>
  
  <GettingStarted
    onClickHandler={handleGetStartedClick}
    securityImage="src/assets/images/aiImage.svg"
  />
  
  <section id="chat-assistant" class="mt-32">
    <Assistant />
  </section>
  