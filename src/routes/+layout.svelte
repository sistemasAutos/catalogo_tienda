<script>
  import '../app.css';
  import Header from '$lib/components/ui/Header.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import { page } from '$app/stores';
</script>

{#if $page.url.pathname.startsWith('/dashboard')}
  <!-- Para rutas del dashboard, usar su propio layout -->
  <slot />
{:else}
  <!-- Para rutas públicas (catálogo, carrito, página principal) -->
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header />
    
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>
    
    <Footer />
  </div>
{/if}