<script>
  import { 
    TrendingUp, 
    Package, 
    ShoppingBag, 
    Users, 
    DollarSign, 
    Clock, 
    AlertCircle,   
    } from 'lucide-svelte';
    
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  // Datos de ejemplo para estadísticas
  let estadisticas = {
    productosTotal: 45,
    pedidosHoy: 12,
    pedidosPendientes: 5,
    clientesNuevos: 8,
    ingresosMes: 12500,
    crecimientoVentas: 15.5,
    productosBajoStock: 3,
    mensajesSinResponder: 2
  };
  
  let pedidosRecientes = [
    { id: 1001, cliente: 'Juan Pérez', total: 450.00, estado: 'Completado', fecha: 'Hoy 14:30' },
    { id: 1002, cliente: 'María García', total: 320.50, estado: 'Pendiente', fecha: 'Hoy 13:45' },
    { id: 1003, cliente: 'Carlos López', total: 890.00, estado: 'En proceso', fecha: 'Hoy 12:20' }
  ];
  
  let productosPopulares = [
    { id: 1, nombre: 'Laptop Gamer Pro', ventas: 45, stock: 8, imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop' },
    { id: 2, nombre: 'Smartphone Ultra', ventas: 38, stock: 15, imagen: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=100&h=100&fit=crop' },
    { id: 3, nombre: 'Audífonos Bluetooth', ventas: 32, stock: 22, imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' }
  ];
  
  onMount(() => {
    // Aquí iría la carga de datos reales desde API
  });
  
  function getEstadoColor(estado) {
    switch(estado) {
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'En proceso': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
</script>

<!-- Encabezado de bienvenida -->
<div class="mb-8">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Bienvenido al Panel de Control</h1>
      <p class="text-gray-600 mt-2">Resumen general de tu tienda y actividades recientes</p>
    </div>
    <div class="flex items-center space-x-3">
      <span class="text-sm text-gray-500">Última actualización: Hoy {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
    </div>
  </div>
</div>

<!-- Grid de estadísticas -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <!-- Productos -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-500 font-medium">Productos Totales</p>
        <p class="text-3xl font-bold text-gray-800 mt-2">{estadisticas.productosTotal}</p>
      </div>
      <div class="p-3 bg-blue-50 rounded-xl">
        <Package class="w-7 h-7 text-blue-600" />
      </div>
    </div>
    <div class="mt-4 pt-4 border-t border-gray-100">
      <a href="/dashboard/productos" class="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
        Gestionar productos
        <TrendingUp class="w-4 h-4 ml-2" />
      </a>
    </div>
  </div>
  
  <!-- Pedidos Hoy -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-500 font-medium">Pedidos Hoy</p>
        <p class="text-3xl font-bold text-gray-800 mt-2">{estadisticas.pedidosHoy}</p>
      </div>
      <div class="p-3 bg-green-50 rounded-xl">
        <ShoppingBag class="w-7 h-7 text-green-600" />
      </div>
    </div>
    <div class="mt-4 pt-4 border-t border-gray-100">
      <div class="flex items-center text-sm text-gray-600">
        <Clock class="w-4 h-4 mr-2" />
        <span>{estadisticas.pedidosPendientes} pendientes</span>
      </div>
    </div>
  </div>
  
  <!-- Ingresos Mensuales -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-500 font-medium">Ingresos del Mes</p>
        <p class="text-3xl font-bold text-gray-800 mt-2">S/ {estadisticas.ingresosMes.toLocaleString()}</p>
        <p class="text-sm text-green-600 mt-1 flex items-center">
          <TrendingUp class="w-4 h-4 mr-1" />
          +{estadisticas.crecimientoVentas}% vs mes anterior
        </p>
      </div>
      <div class="p-3 bg-purple-50 rounded-xl">
        <DollarSign class="w-7 h-7 text-purple-600" />
      </div>
    </div>
  </div>
  
  <!-- Clientes Nuevos -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-500 font-medium">Clientes Nuevos</p>
        <p class="text-3xl font-bold text-gray-800 mt-2">{estadisticas.clientesNuevos}</p>
      </div>
      <div class="p-3 bg-amber-50 rounded-xl">
        <Users class="w-7 h-7 text-amber-600" />
      </div>
    </div>
    <div class="mt-4 pt-4 border-t border-gray-100">
      <a href="/dashboard/clientes" class="text-amber-600 hover:text-amber-800 text-sm font-medium flex items-center">
        Ver clientes
        <Users class="w-4 h-4 ml-2" />
      </a>
    </div>
  </div>
</div>

<!-- Contenido principal en 2 columnas -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
  <!-- Pedidos Recientes -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-800">Pedidos Recientes</h3>
        <p class="text-sm text-gray-500">Últimos pedidos recibidos</p>
      </div>
      <a href="/dashboard/pedidos" class="text-primary-600 hover:text-primary-800 text-sm font-medium">
        Ver todos →
      </a>
    </div>
    
    <div class="space-y-4">
      {#each pedidosRecientes as pedido}
        <div class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <ShoppingBag class="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p class="font-medium text-gray-800">Pedido #{pedido.id}</p>
                <p class="text-sm text-gray-600">{pedido.cliente}</p>
              </div>
            </div>
          </div>
          <div class="text-right">
            <p class="font-bold text-gray-800">S/ {pedido.total.toFixed(2)}</p>
            <span class={`inline-block px-2 py-1 text-xs rounded-full font-medium ${getEstadoColor(pedido.estado)}`}>
              {pedido.estado}
            </span>
            <p class="text-xs text-gray-500 mt-1">{pedido.fecha}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Productos Populares -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-800">Productos Más Vendidos</h3>
        <p class="text-sm text-gray-500">Top productos este mes</p>
      </div>
      <a href="/dashboard/productos" class="text-primary-600 hover:text-primary-800 text-sm font-medium">
        Gestionar →
      </a>
    </div>
    
    <div class="space-y-4">
      {#each productosPopulares as producto}
        <div class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={producto.imagen} 
                alt={producto.nombre}
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <p class="font-medium text-gray-800">{producto.nombre}</p>
              <div class="flex items-center space-x-4 mt-1">
                <span class="text-sm text-gray-600">{producto.ventas} ventas</span>
                <span class={`text-xs px-2 py-1 rounded-full ${producto.stock < 10 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                  Stock: {producto.stock}
                </span>
              </div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-medium text-primary-600">
              {#if producto.ventas > 30}
                🔥 Muy popular
              {:else if producto.ventas > 20}
                ⭐ Popular
              {:else}
                👍 Buenas ventas
              {/if}
            </div>
          </div>
        </div>
      {/each}
      
      <!-- Alertas -->
      {#if estadisticas.productosBajoStock > 0 || estadisticas.mensajesSinResponder > 0}
        <div class="mt-6 space-y-3">
          {#if estadisticas.productosBajoStock > 0}
            <div class="p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <div class="flex items-center">
                <AlertCircle class="w-5 h-5 text-amber-500 mr-2" />
                <span class="text-sm text-amber-700">
                  {estadisticas.productosBajoStock} productos con bajo stock
                </span>
              </div>
            </div>
          {/if}
          
          {#if estadisticas.mensajesSinResponder > 0}
            <div class="p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <div class="flex items-center">
                <MessageCircle class="w-5 h-5 text-blue-500 mr-2" />
                <span class="text-sm text-blue-700">
                  {estadisticas.mensajesSinResponder} mensajes sin responder
                </span>
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- Acciones Rápidas -->
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <h3 class="text-lg font-semibold text-gray-800 mb-6">Acciones Rápidas</h3>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <a href="/dashboard/productos?action=create" class="group p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
          <Package class="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <p class="font-medium text-gray-800">Nuevo Producto</p>
          <p class="text-sm text-gray-600">Agregar al catálogo</p>
        </div>
      </div>
    </a>
    
    <a href="/dashboard/mensajes" class="group p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
          <MessageCircle class="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p class="font-medium text-gray-800">Mensajes</p>
          <p class="text-sm text-gray-600">Ver y responder</p>
        </div>
      </div>
    </a>
    
    <a href="/dashboard/configuracion" class="group p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
          <Settings class="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <p class="font-medium text-gray-800">Configuración</p>
          <p class="text-sm text-gray-600">Ajustes de tienda</p>
        </div>
      </div>
    </a>
    
    <a href="/" target="_blank" class="group p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
          <Store class="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p class="font-medium text-gray-800">Ver Tienda</p>
          <p class="text-sm text-gray-600">Catálogo público</p>
        </div>
      </div>
    </a>
  </div>
</div>

<!-- Script para imports -->
<script context="module">
  import { MessageCircle, Settings, Store } from 'lucide-svelte';
</script>