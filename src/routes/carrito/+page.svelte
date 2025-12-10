<script>
  import { ShoppingCart, Trash2, ArrowLeft, CreditCard, MessageCircle } from 'lucide-svelte';
  import { carrito, subtotal, totalConImpuestos, carritoVacio } from '$lib/stores/carritoStore';
  import CartItem from '$lib/components/cart/CartItem.svelte';
  import { generarEnlacePedido } from '$lib/utils/whatsapp';
  
  // Datos simulados de configuración
  let configuracion = {
    nombre_empresa: 'CatálogoExpress',
    whatsapp_numero: '51987654321',
    moneda_simbolo: 'S/',
    impuesto_porcentaje: 18
  };
  
  // Datos del cliente (podría venir de un formulario en el futuro)
  let datosCliente = {
    nombre: '',
    telefono: ''
  };
  
  // Función para generar mensaje de WhatsApp usando la utilidad
  function generarMensajeWhatsApp() {
    const pedido = {
      cliente_nombre: datosCliente.nombre || '',
      cliente_whatsapp: datosCliente.telefono || ''
    };
    
    try {
      const url = generarEnlacePedido(pedido, $carrito, configuracion);
      window.open(url, '_blank');
    } catch (error) {
      alert(error.message);
    }
  }
  
  // Función para limpiar el carrito
  function limpiarCarrito() {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
      carrito.limpiarCarrito();
    }
  }
</script>

<div class="max-w-6xl mx-auto">
  <!-- Encabezado -->
  <div class="mb-8">
    <a href="/" class="inline-flex items-center text-primary-600 hover:text-primary-800 mb-4">
      <ArrowLeft class="w-4 h-4 mr-2" />
      Volver al catálogo
    </a>
    <h1 class="text-3xl font-bold text-gray-800">Mi Carrito</h1>
    <p class="text-gray-600 mt-2">
      Revisa tu pedido y envíalo por WhatsApp para finalizar la compra
    </p>
  </div>
  
  {#if $carritoVacio}
    <!-- Carrito Vacío -->
    <div class="text-center py-16 bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300">
      <div class="max-w-md mx-auto">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart class="w-12 h-12 text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">Tu carrito está vacío</h3>
        <p class="text-gray-500 mb-6">
          Añade productos desde el catálogo para comenzar tu pedido
        </p>
        <a href="/" class="btn-primary inline-flex items-center">
          <ShoppingCart class="w-4 h-4 mr-2" />
          Ver catálogo
        </a>
      </div>
    </div>
  {:else}
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Lista de Productos -->
      <div class="lg:w-2/3">
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
          <!-- Encabezado de la tabla -->
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <h2 class="font-semibold text-gray-700">
                Productos ({$carrito.reduce((total, item) => total + item.cantidad, 0)} items)
              </h2>
              <button
                on:click={limpiarCarrito}
                class="text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <Trash2 class="w-4 h-4 mr-1" />
                Vaciar carrito
              </button>
            </div>
          </div>
          
          <!-- Items del carrito -->
          <div class="divide-y divide-gray-100">
            {#each $carrito as item (item.id)}
              <CartItem {item} />
            {/each}
          </div>
          
          <!-- Datos del cliente (opcional) -->
          <div class="p-6 border-t border-gray-200">
            <h3 class="font-medium text-gray-700 mb-4">Información de contacto (opcional)</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="label">Tu nombre</label>
                <input
                  type="text"
                  bind:value={datosCliente.nombre}
                  placeholder="Ej: Juan Pérez"
                  class="input"
                />
              </div>
              <div>
                <label class="label">Tu WhatsApp</label>
                <input
                  type="tel"
                  bind:value={datosCliente.telefono}
                  placeholder="Ej: 987654321"
                  class="input"
                />
              </div>
            </div>
            <p class="text-sm text-gray-500 mt-2">
              Esta información se incluirá en el mensaje de WhatsApp para facilitar el contacto.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Resumen del Pedido -->
      <div class="lg:w-1/3">
        <div class="bg-white rounded-xl shadow-sm p-6 sticky top-24">
          <h2 class="text-xl font-bold text-gray-800 mb-6">Resumen del Pedido</h2>
          
          <!-- Detalles del pedido -->
          <div class="space-y-4 mb-6">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-medium">{configuracion.moneda_simbolo}{$subtotal.toFixed(2)}</span>
            </div>
            
            <div class="flex justify-between">
              <span class="text-gray-600">Impuestos ({configuracion.impuesto_porcentaje}%)</span>
              <span class="font-medium">{configuracion.moneda_simbolo}{($totalConImpuestos - $subtotal).toFixed(2)}</span>
            </div>
            
            <div class="border-t border-gray-200 pt-4">
              <div class="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span class="text-primary-700">{configuracion.moneda_simbolo}{$totalConImpuestos.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <!-- Botón de WhatsApp -->
          <button
            on:click={generarMensajeWhatsApp}
            class="w-full btn-primary flex items-center justify-center gap-2 mb-4"
          >
            <MessageCircle class="w-5 h-5" />
            Enviar pedido por WhatsApp
          </button>
          
          <!-- Información adicional -->
          <div class="text-sm text-gray-500 border-t border-gray-100 pt-4">
            <p class="mb-2">
              <strong>¿Cómo funciona?</strong>
            </p>
            <ul class="list-disc pl-4 space-y-1">
              <li>Tu pedido se enviará al número: {configuracion.whatsapp_numero}</li>
              <li>Revisaremos disponibilidad y te contactaremos</li>
              <li>Coordina el método de pago y entrega por WhatsApp</li>
              <li>Sin costos adicionales por la plataforma</li>
            </ul>
          </div>
          
          <!-- Métodos de pago sugeridos -->
          <div class="mt-6 pt-4 border-t border-gray-100">
            <p class="text-sm font-medium text-gray-700 mb-2">Métodos de pago aceptados:</p>
            <div class="flex items-center gap-2">
              <div class="p-2 bg-green-50 rounded-md">
                <CreditCard class="w-5 h-5 text-green-600" />
              </div>
              <span class="text-sm text-gray-600">Efectivo, Yape, Plin, Transferencia</span>
            </div>
          </div>
        </div>
        
        <!-- Nota importante -->
        <div class="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-blue-800">Importante</h3>
              <div class="mt-2 text-sm text-blue-700">
                <p>
                  Este no es un sistema de pago en línea. El pedido se envía directamente al vendedor por WhatsApp para coordinar pago y entrega.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>