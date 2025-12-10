<script>
  import { ShoppingCart, MessageCircle } from 'lucide-svelte';
  import { carrito } from '$lib/stores/carritoStore';
  import { generarEnlacePregunta } from '$lib/utils/whatsapp';
  
  export let producto;
  
  // Datos de configuración simulados
  const config = {
    nombre_empresa: 'CatálogoExpress',
    whatsapp_numero: '7121920418',
    moneda_simbolo: '$'
  };
  
  // Función para agregar al carrito
  function agregarAlCarrito() {
    carrito.agregarProducto(producto);
  }
  
  // Función para preguntar por WhatsApp
  function preguntarPorWhatsApp() {
    const url = generarEnlacePregunta(producto, config);
    window.open(url, '_blank');
  }
</script>

<div class="card hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
  <!-- Imagen del producto -->
  <div class="relative h-48 bg-gray-100 overflow-hidden">
    {#if producto.imagen_url}
      <img 
        src={producto.imagen_url} 
        alt={producto.nombre}
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    {:else}
      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
        <ShoppingCart class="w-16 h-16 text-gray-400" />
      </div>
    {/if}
    
    <!-- Etiqueta de stock -->
    {#if producto.stock <= 5 && producto.stock > 0}
      <span class="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
        Últimas {producto.stock} unidades
      </span>
    {:else if producto.stock === 0}
      <span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
        Agotado
      </span>
    {/if}
  </div>
  
  <!-- Contenido del producto -->
  <div class="p-4 flex-grow flex flex-col">
    <h3 class="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
      {producto.nombre}
    </h3>
    
    <p class="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
      {producto.descripcion_larga || 'Sin descripción disponible'}
    </p>
    
    <!-- Precio y acciones -->
    <div class="mt-auto">
      <div class="flex justify-between items-center mb-4">
        <div>
          <span class="text-2xl font-bold text-primary-700">
            {config.moneda_simbolo}{producto.precio.toFixed(2)}
          </span>
          {#if producto.stock > 0}
            <p class="text-sm text-gray-500">
              Stock: {producto.stock} unidades
            </p>
          {/if}
        </div>
      </div>
      
      <div class="flex gap-2">
        <button
          on:click={agregarAlCarrito}
          disabled={producto.stock === 0}
          class="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          title={producto.stock === 0 ? 'Producto agotado' : 'Añadir al carrito'}
        >
          <ShoppingCart class="w-4 h-4" />
          <span class="hidden sm:inline">Añadir</span>
        </button>
        
        <button
          on:click={preguntarPorWhatsApp}
          class="btn-outline flex items-center justify-center gap-2"
          title="Preguntar por WhatsApp"
        >
          <MessageCircle class="w-4 h-4" />
          <span class="hidden sm:inline">Consultar</span>
        </button>
      </div>
    </div>
  </div>
</div>