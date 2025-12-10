<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { auth } from '$lib/stores/authStore';
  import DashboardSidebar from '$lib/components/dashboard/DashboardSidebar.svelte';
  import DashboardHeader from '$lib/components/dashboard/DashboardHeader.svelte';
  
  let loading = true;
  let sidebarCollapsed = false;
  
  onMount(async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (window.location.pathname === '/dashboard/login') {
      loading = false;
      return;
    }
    
    if (!$auth.isAuthenticated) {
      goto('/dashboard/login');
    }
    
    loading = false;
  });
  
  $: if (!$auth.isAuthenticated && !loading && window.location.pathname !== '/dashboard/login') {
    goto('/dashboard/login');
  }
</script>

{#if loading}
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
{:else if $page.url.pathname === '/dashboard/login'}
  <slot />
{:else if !$auth.isAuthenticated}
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Redirigiendo al login...</p>
    </div>
  </div>
{:else}
  <div class="min-h-screen bg-gray-50 flex">
    <DashboardSidebar bind:collapsed={sidebarCollapsed} />
    
    <div class="flex-1 flex flex-col {sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300">
      <DashboardHeader bind:sidebarCollapsed />
      
      <main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>
      
      <footer class="bg-white border-t border-gray-200 px-6 py-4">
        <div class="flex justify-between items-center text-sm text-gray-600">
          <span>{$auth.user?.name || 'Administrador'} • {$auth.user?.role || 'Admin'}</span>
          <span>© {new Date().getFullYear()} CatálogoExpress • Panel de Control</span>
        </div>
      </footer>
    </div>
  </div>
{/if}