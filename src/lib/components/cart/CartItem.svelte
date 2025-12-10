<script>
  import { Plus, Minus, Trash2 } from 'lucide-svelte';
  import { carrito } from '$lib/stores/carritoStore';
  
  export let item;
  
  // Funciones para manejar cantidad
  function aumentarCantidad() {
    carrito.actualizarCantidad(item.id, item.cantidad + 1);
  }
  
  function disminuirCantidad() {
    carrito.actualizarCantidad(item.id, item.cantidad - 1);
  }
  
  function eliminarProducto() {
    carrito.eliminarProducto(item.id);
  }
  
  // Calcular subtotal por item
  $: subtotalItem = item.precio_unitario * item.cantidad;
</script>

<div class="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors">
  <!-- Imagen del producto -->
  <div class="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden mr-4">
    {#if item.imagen_url}
      <img 
        src={item.imagen_url} 
        alt={item.nombre}
        class="w-full h-full object-cover"
      />
    {:else}
      <div class="w-full h-full flex items-center justify-center">
        <div class="text-gray-400 text-xs text-center">Sin imagen</div>
      </div>
    {/if}
  </div>
  
  <!-- Información del producto -->
  <div class="flex-grow">
    <div class="flex justify-between">
      <div>
        <h3 class="font-medium text-gray-800">{item.nombre}</h3>
        {#if item.marca}
          <p class="text-sm text-gray-500">{item.marca}</p>
        {/if}
        <p class="text-primary-600 font-bold">S/ {item.precio_unitario.toFixed(2)}</p>
      </div>
      
      <div class="text-right">
        <p class="text-lg font-bold text-gray-800">S/ {subtotalItem.toFixed(2)}</p>
        {#if item.cantidad > 1}
          <p class="text-sm text-gray-500">
            {item.cantidad} × S/ {item.precio_unitario.toFixed(2)}
          </p>
        {/if}
      </div>
    </div>
    
    <!-- Controles de cantidad -->
    <div class="flex items-center justify-between mt-3">
      <div class="flex items-center space-x-2">
        <button
          on:click={disminuirCantidad}
          class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={item.cantidad <= 1}
          title="Disminuir cantidad"
        >
          <Minus class="w-4 h-4" />
        </button>
        
        <span class="w-12 text-center font-medium">{item.cantidad}</span>
        
        <button
          on:click={aumentarCantidad}
          class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
          title="Aumentar cantidad"
        >
          <Plus class="w-4 h-4" />
        </button>
      </div>
      
      <button
        on:click={eliminarProducto}
        class="text-red-600 hover:text-red-800 flex items-center text-sm"
        title="Eliminar del carrito"
      >
        <Trash2 class="w-4 h-4 mr-1" />
        Eliminar
      </button>
    </div>
  </div>
</div>