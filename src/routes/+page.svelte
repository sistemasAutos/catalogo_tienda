<script>
  import ProductCard from '$lib/components/catalog/ProductCard.svelte';
  import { Search, Filter } from 'lucide-svelte';
  
  // Datos simulados por ahora
  import { productos } from '$lib/data/productos';
  
  let busqueda = '';
  let categoriaFiltro = 'todas';
  
  // Filtrar productos
  $: productosFiltrados = productos.filter(producto => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                            producto.descripcion_larga.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideCategoria = categoriaFiltro === 'todas' || 
                             producto.categoria_id.toString() === categoriaFiltro;
    
    return coincideBusqueda && coincideCategoria;
  });
  
  // Obtener categorías únicas (simulado)
  const categorias = [
    { id: '1', nombre: 'Electrónica' },
    { id: '2', nombre: 'Ropa' },
    { id: '3', nombre: 'Hogar' }
  ];
</script>

<div class="space-y-8">
  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
    <div class="max-w-2xl">
      <h1 class="text-4xl font-bold mb-4">Catálogo de Productos</h1>
      <p class="text-lg opacity-90">
        Encuentra los mejores productos y haz tu pedido directamente por WhatsApp. 
        Fácil, rápido y sin complicaciones.
      </p>
    </div>
  </section>
  
  <!-- Filtros y Búsqueda -->
  <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <!-- Búsqueda -->
      <div class="flex-1">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar productos..."
            bind:value={busqueda}
            class="input pl-10"
          />
        </div>
      </div>
      
      <!-- Filtro por categoría -->
      <div class="w-full md:w-48">
        <div class="relative">
          <Filter class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select 
            bind:value={categoriaFiltro}
            class="input pl-10 appearance-none"
          >
            <option value="todas">Todas las categorías</option>
            {#each categorias as categoria}
              <option value={categoria.id}>{categoria.nombre}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Contador de resultados -->
  <div class="flex justify-between items-center">
    <h2 class="text-2xl font-bold text-gray-800">
      Productos {#if productosFiltrados.length !== productos.length}({productosFiltrados.length}){/if}
    </h2>
    <span class="text-gray-600">
      {productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto' : 'productos'} encontrados
    </span>
  </div>
  
  <!-- Grid de Productos -->
  {#if productosFiltrados.length > 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {#each productosFiltrados as producto (producto.id)}
        <ProductCard {producto} />
      {/each}
    </div>
  {:else}
    <!-- Estado vacío -->
    <div class="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
      <div class="max-w-md mx-auto">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search class="w-12 h-12 text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No se encontraron productos</h3>
        <p class="text-gray-500 mb-6">
          {busqueda 
            ? `No hay resultados para "${busqueda}"` 
            : 'Intenta ajustar los filtros de búsqueda'}
        </p>
        {#if busqueda}
          <button 
            on:click={() => busqueda = ''}
            class="btn-primary"
          >
            Limpiar búsqueda
          </button>
        {/if}
      </div>
    </div>
  {/if}
</div>

