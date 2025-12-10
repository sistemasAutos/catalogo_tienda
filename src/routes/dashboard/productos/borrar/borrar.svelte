<script>
  import { onMount } from 'svelte';
  // IMPORTAR TODOS LOS ICONOS NECESARIOS
  import { 
    Package, 
    ShoppingBag, 
    Users, 
    DollarSign, 
    TrendingUp, 
    Clock, 
    AlertCircle,
      } from 'lucide-svelte';
  import { auth } from '$lib/stores/authStore';
  import { goto } from '$app/navigation';
  
  // Datos simulados para el dashboard
  let estadisticas = {
    productosTotal: 45,
    pedidosHoy: 12,
    pedidosPendientes: 5,
    ingresosMes: 12500,
    crecimientoVentas: 15.5,
    productosBajoStock: 3
  };
  
  let pedidosRecientes = [
    { id: 1001, cliente: 'Juan Pérez', total: 450.00, estado: 'Completado', fecha: '2024-01-15 14:30' },
    { id: 1002, cliente: 'María García', total: 320.50, estado: 'Pendiente', fecha: '2024-01-15 13:45' },
    { id: 1003, cliente: 'Carlos López', total: 890.00, estado: 'En proceso', fecha: '2024-01-15 12:20' },
    { id: 1004, cliente: 'Ana Martínez', total: 125.75, estado: 'Completado', fecha: '2024-01-15 11:15' }
  ];
  
  let productosPopulares = [
    { id: 1, nombre: 'Laptop Gamer Pro', ventas: 45, stock: 8 },
    { id: 2, nombre: 'Smartphone Ultra', ventas: 38, stock: 15 },
    { id: 3, nombre: 'Audífonos Bluetooth', ventas: 32, stock: 22 }
  ];
  
  // Función para cerrar sesión
  function handleLogout() {
    auth.logout();
    goto('/dashboard/login');
  }
</script>

<div class="min-h-screen bg-gray-50">
  <!-- Navbar del Dashboard -->
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <h1 class="text-xl font-bold text-gray-800">Dashboard</h1>
          <span class="ml-2 px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full">
            Administración
          </span>
        </div>
        
        <div class="flex items-center space-x-4">
          <div class="text-sm text-gray-700">
            Hola, <span class="font-semibold">{$auth.user?.name}</span>
          </div>
          <button
            on:click={handleLogout}
            class="px-4 py-2 text-sm bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  </nav>
  
  <!-- Sidebar y Contenido -->
  <div class="flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
      <nav class="p-4 space-y-2">
        <a href="/dashboard" class="flex items-center space-x-3 px-3 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium">
          <TrendingUp class="w-5 h-5" />
          <span>Resumen</span>
        </a>
        
        <a href="/dashboard/productos" class="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
          <Package class="w-5 h-5" />
          <span>Productos</span>
        </a>
        
        <a href="/dashboard/pedidos" class="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
          <ShoppingBag class="w-5 h-5" />
          <span>Pedidos</span>
        </a>
        
        <a href="/dashboard/mensajes" class="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
          <MessageCircle class="w-5 h-5" />
          <span>Mensajes WhatsApp</span>
        </a>
        
        <a href="/dashboard/configuracion" class="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
          <Settings class="w-5 h-5" />
          <span>Configuración</span>
        </a>
      </nav>
    </aside>
    
    <!-- Contenido principal -->
    <main class="flex-1 p-6">
      <div class="max-w-7xl mx-auto">
        <!-- Bienvenida -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800">Bienvenido al Panel de Control</h2>
          <p class="text-gray-600">Gestiona tu catálogo, pedidos y configuración desde aquí.</p>
        </div>
        
        <!-- Cards de estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <!-- Productos -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Productos Totales</p>
                <p class="text-3xl font-bold text-gray-800 mt-2">{estadisticas.productosTotal}</p>
              </div>
              <div class="p-3 bg-blue-50 rounded-lg">
                <Package class="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div class="mt-4">
              <a href="/dashboard/productos" class="text-primary-600 hover:text-primary-800 text-sm font-medium">
                Gestionar productos →
              </a>
            </div>
          </div>
          
          <!-- Pedidos Hoy -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Pedidos Hoy</p>
                <p class="text-3xl font-bold text-gray-800 mt-2">{estadisticas.pedidosHoy}</p>
              </div>
              <div class="p-3 bg-green-50 rounded-lg">
                <ShoppingBag class="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div class="mt-4">
              <div class="flex items-center text-sm text-gray-600">
                <Clock class="w-4 h-4 mr-1" />
                <span>{estadisticas.pedidosPendientes} pendientes</span>
              </div>
            </div>
          </div>
          
          <!-- Ingresos -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Ingresos del Mes</p>
                <p class="text-3xl font-bold text-gray-800 mt-2">S/ {estadisticas.ingresosMes.toLocaleString()}</p>
                <p class="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp class="w-4 h-4 mr-1" />
                  +{estadisticas.crecimientoVentas}% vs mes anterior
                </p>
              </div>
              <div class="p-3 bg-purple-50 rounded-lg">
                <DollarSign class="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Pedidos Recientes -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-semibold text-gray-800">Pedidos Recientes</h3>
              <a href="/dashboard/pedidos" class="text-sm text-primary-600 hover:text-primary-800">
                Ver todos →
              </a>
            </div>
            
            <div class="space-y-4">
              {#each pedidosRecientes as pedido}
                <div class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div>
                    <p class="font-medium text-gray-800">Pedido #{pedido.id}</p>
                    <p class="text-sm text-gray-600">{pedido.cliente}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-gray-800">S/ {pedido.total.toFixed(2)}</p>
                    <span class={`inline-block px-2 py-1 text-xs rounded-full ${
                      pedido.estado === 'Completado' ? 'bg-green-100 text-green-800' :
                      pedido.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {pedido.estado}
                    </span>
                  </div>
                </div>
              {/each}
            </div>
          </div>
          
          <!-- Productos Populares -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-semibold text-gray-800">Productos Más Vendidos</h3>
              <a href="/dashboard/productos" class="text-sm text-primary-600 hover:text-primary-800">
                Gestionar →
              </a>
            </div>
            
            <div class="space-y-4">
              {#each productosPopulares as producto}
                <div class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop" 
                        alt={producto.nombre}
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p class="font-medium text-gray-800">{producto.nombre}</p>
                      <p class="text-sm text-gray-600">{producto.ventas} ventas</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class={`text-sm font-medium ${
                      producto.stock < 10 ? 'text-amber-600' : 'text-green-600'
                    }`}>
                      Stock: {producto.stock}
                    </p>
                    {#if producto.stock < 10}
                      <p class="text-xs text-amber-500">Bajo stock</p>
                    {/if}
                  </div>
                </div>
              {/each}
              
              <!-- Alerta de productos bajos de stock -->
              {#if estadisticas.productosBajoStock > 0}
                <div class="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg">
                  <div class="flex items-center">
                    <AlertCircle class="w-5 h-5 text-red-500 mr-2" />
                    <span class="text-sm text-red-700">
                      Tienes {estadisticas.productosBajoStock} productos con bajo stock
                    </span>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
        
        <!-- Acciones Rápidas -->
        <div class="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Acciones Rápidas</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/dashboard/productos?action=create" class="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-primary-100 rounded-lg">
                  <Package class="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p class="font-medium text-gray-800">Nuevo Producto</p>
                  <p class="text-sm text-gray-600">Agregar al catálogo</p>
                </div>
              </div>
            </a>
            
            <a href="/dashboard/mensajes" class="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-green-100 rounded-lg">
                  <MessageCircle class="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p class="font-medium text-gray-800">Mensajes</p>
                  <p class="text-sm text-gray-600">Configurar plantillas</p>
                </div>
              </div>
            </a>
            
            <a href="/dashboard/configuracion" class="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-purple-100 rounded-lg">
                  <Settings class="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p class="font-medium text-gray-800">Configuración</p>
                  <p class="text-sm text-gray-600">Ajustes de la tienda</p>
                </div>
              </div>
            </a>
            
            <a href="/" target="_blank" class="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <Store class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p class="font-medium text-gray-800">Ver Tienda</p>
                  <p class="text-sm text-gray-600">Abrir catálogo público</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>

<!-- Importar iconos adicionales -->
<script context="module">
  import { MessageCircle, Settings, Store } from 'lucide-svelte';
</script>