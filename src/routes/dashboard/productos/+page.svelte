<script>
  import { Package, Plus, Edit, Trash2, Search } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  
  let busqueda = '';
  
  // Datos simulados
  let productos = [
    { id: 1, nombre: 'Laptop Gamer Pro', precio: 1299.99, categoria: 'Electrónica', stock: 15, estado: 'Activo' },
    { id: 2, nombre: 'Smartphone Ultra', precio: 799.99, categoria: 'Electrónica', stock: 25, estado: 'Activo' },
    { id: 3, nombre: 'Audífonos Bluetooth', precio: 149.99, categoria: 'Electrónica', stock: 40, estado: 'Activo' },
    { id: 4, nombre: 'Camiseta Básica', precio: 24.99, categoria: 'Ropa', stock: 100, estado: 'Activo' },
    { id: 5, nombre: 'Zapatos Deportivos', precio: 89.99, categoria: 'Ropa', stock: 30, estado: 'Activo' },
    { id: 6, nombre: 'Lámpara de Mesa LED', precio: 45.99, categoria: 'Hogar', stock: 20, estado: 'Activo' }
  ];
</script>

<div class="p-6">
  <!-- Header -->
  <div class="flex justify-between items-center mb-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-800">Gestión de Productos</h1>
      <p class="text-gray-600">Administra tu catálogo de productos</p>
    </div>
    <button
      on:click={() => goto('/dashboard/productos/nuevo')}
      class="btn-primary flex items-center"
    >
      <Plus class="w-5 h-5 mr-2" />
      Nuevo Producto
    </button>
  </div>
  
  <!-- Barra de búsqueda y filtros -->
  <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex-1">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            bind:value={busqueda}
            placeholder="Buscar productos..."
            class="input pl-10"
          />
        </div>
      </div>
      <div class="flex space-x-2">
        <select class="input">
          <option>Todas las categorías</option>
          <option>Electrónica</option>
          <option>Ropa</option>
          <option>Hogar</option>
        </select>
        <select class="input">
          <option>Todos los estados</option>
          <option>Activo</option>
          <option>Inactivo</option>
          <option>Agotado</option>
        </select>
      </div>
    </div>
  </div>
  
  <!-- Tabla de productos -->
  <div class="bg-white rounded-xl shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Producto
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoría
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each productos as producto}
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Package class="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{producto.nombre}</div>
                    <div class="text-sm text-gray-500">ID: {producto.id}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {producto.categoria}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                S/ {producto.precio.toFixed(2)}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-24 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      class="bg-green-600 h-2 rounded-full" 
                      style={`width: ${Math.min(100, (producto.stock / 100) * 100)}%`}
                    ></div>
                  </div>
                  <span class="text-sm font-medium">{producto.stock}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  producto.estado === 'Activo' ? 'bg-green-100 text-green-800' :
                  producto.estado === 'Agotado' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {producto.estado}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    on:click={() => goto(`/dashboard/productos/editar/${producto.id}`)}
                    class="text-blue-600 hover:text-blue-900"
                    title="Editar"
                  >
                    <Edit class="w-5 h-5" />
                  </button>
                  <button
                    on:click={() => confirm(`¿Eliminar ${producto.nombre}?`)}
                    class="text-red-600 hover:text-red-900"
                    title="Eliminar"
                  >
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  
  <!-- Paginación -->
  <div class="mt-6 flex justify-between items-center">
    <div class="text-sm text-gray-700">
      Mostrando <span class="font-medium">1</span> a <span class="font-medium">{productos.length}</span> de <span class="font-medium">{productos.length}</span> productos
    </div>
    <div class="flex space-x-2">
      <button class="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50" disabled>
        Anterior
      </button>
      <button class="px-3 py-1 bg-primary-600 text-white rounded-md text-sm">
        1
      </button>
      <button class="px-3 py-1 border border-gray-300 rounded-md text-sm">
        Siguiente
      </button>
    </div>
  </div>
</div>