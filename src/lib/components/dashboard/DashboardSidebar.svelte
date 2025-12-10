<script>
  import { 
    LayoutDashboard, 
    Package, 
    ShoppingBag, 
    MessageCircle,
    Settings,
    Store,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Home,
    X
  } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  import { auth } from '$lib/stores/authStore';
  
  export let collapsed = false;
  export let mobileOpen = false;
  
  // Rutas básicas
  const menuItems = [
    { icon: LayoutDashboard, label: 'Resumen', href: '/dashboard' },
    { icon: Package, label: 'Productos', href: '/dashboard/productos' },
    { icon: ShoppingBag, label: 'Pedidos', href: '/dashboard/pedidos' },
    { icon: MessageCircle, label: 'Mensajes', href: '/dashboard/mensajes' },
    { icon: Settings, label: 'Configuración', href: '/dashboard/configuracion' }
  ];
  
  function handleLogout() {
    auth.logout();
    goto('/dashboard/login');
  }
  
  // Cerrar sidebar en mobile al hacer click en un enlace
  function handleNavClick() {
    if (window.innerWidth < 768) { // mobile
      mobileOpen = false;
    }
  }
</script>

<aside 
  class="bg-gray-900 text-white h-full flex flex-col z-40 sidebar-transition"
  class:fixed={mobileOpen}
  class:relative={!mobileOpen}
  class:w-20={collapsed && !mobileOpen}
  class:w-64={(!collapsed && !mobileOpen) || mobileOpen}
  class:hidden={!mobileOpen && window.innerWidth < 768}
  class:block={mobileOpen || window.innerWidth >= 768}
  class:left-0={mobileOpen}
  class:top-0={mobileOpen}
  class:bottom-0={mobileOpen}
  class:shadow-2xl={mobileOpen}
>
  <!-- Header móvil -->
  {#if mobileOpen}
    <div class="md:hidden p-4 border-b border-gray-800 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
          <Store class="w-6 h-6" />
        </div>
        <div>
          <h1 class="font-bold text-lg">CatálogoExpress</h1>
          <p class="text-gray-400 text-xs">Panel Admin</p>
        </div>
      </div>
      <button
        on:click={() => mobileOpen = false}
        class="p-2 rounded-lg hover:bg-gray-800 transition-colors"
        title="Cerrar menú"
      >
        <X class="w-5 h-5" />
      </button>
    </div>
  {/if}
  
  <!-- Logo y toggle (desktop) -->
  <div class="hidden md:flex p-6 border-b border-gray-800 items-center {collapsed && !mobileOpen ? 'justify-center' : 'justify-between'}">
    {#if !collapsed || mobileOpen}
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
          <Store class="w-6 h-6" />
        </div>
        <div>
          <h1 class="font-bold text-lg">CatálogoExpress</h1>
          <p class="text-gray-400 text-xs">Panel Admin</p>
        </div>
      </div>
      {#if !mobileOpen}
        <button
          on:click={() => collapsed = !collapsed}
          class="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          title={collapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
        >
          <ChevronLeft class="w-5 h-5 {collapsed ? 'rotate-180' : ''}" />
        </button>
      {/if}
    {:else}
      <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mx-auto">
        <Store class="w-6 h-6" />
      </div>
    {/if}
  </div>
  
  <!-- Menú de navegación -->
  <nav class="p-4 space-y-2 flex-grow overflow-y-auto">
    {#each menuItems as item}
      <a
        href={item.href}
        on:click={handleNavClick}
        class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors group"
      >
        <div class="relative">
          <item.icon class="w-5 h-5" />
        </div>
        {#if !collapsed || mobileOpen}
          <span class="font-medium">{item.label}</span>
        {/if}
      </a>
    {/each}
  </nav>
  
  <!-- Enlace a tienda pública -->
  <div class="p-4 border-t border-gray-800">
    <a
      href="/"
      target="_blank"
      on:click={handleNavClick}
      class="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group"
    >
      <Home class="w-5 h-5" />
      {#if !collapsed || mobileOpen}
        <span class="font-medium">Ver Tienda Pública</span>
      {/if}
    </a>
  </div>
  
  <!-- Usuario y logout -->
  <div class="p-4 border-t border-gray-800">
    {#if (!collapsed || mobileOpen) && $auth.user}
      <div class="mb-4 px-4">
        <p class="font-medium text-sm">{$auth.user?.name || 'Administrador'}</p>
        <p class="text-gray-400 text-xs">{$auth.user?.email || 'admin@catalogoexpress.com'}</p>
      </div>
    {/if}
    
    <button
      on:click={handleLogout}
      class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-900/20 text-red-300 hover:text-red-200 transition-colors w-full"
    >
      <LogOut class="w-5 h-5" />
      {#if !collapsed || mobileOpen}
        <span class="font-medium">Cerrar Sesión</span>
      {/if}
    </button>
  </div>
</aside>

<!-- Overlay para móvil -->
{#if mobileOpen}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
    on:click={() => mobileOpen = false}
  ></div>
{/if}

<!-- Botón para expandir sidebar cuando está colapsado (desktop) -->
{#if collapsed && !mobileOpen && window.innerWidth >= 768}
  <button
    on:click={() => collapsed = false}
    class="fixed top-6 left-20 z-30 p-2 bg-gray-900 text-white rounded-r-lg hover:bg-gray-800 transition-colors shadow-lg hidden md:block"
    title="Expandir sidebar"
  >
    <ChevronRight class="w-5 h-5" />
  </button>
{/if}

<style>
  .sidebar-transition {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>