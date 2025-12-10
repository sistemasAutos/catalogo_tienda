<script>
  import { ShoppingBag, Filter, Download } from 'lucide-svelte';
  
  let pedidos = [
    { id: 1001, cliente: 'Juan Pérez', total: 450.00, estado: 'Pendiente', fecha: '2024-01-15', items: 3 },
    { id: 1002, cliente: 'María García', total: 320.50, estado: 'Completado', fecha: '2024-01-14', items: 2 },
    { id: 1003, cliente: 'Carlos López', total: 890.00, estado: 'En proceso', fecha: '2024-01-14', items: 5 }
  ];
</script>

<div class="p-6">
  <div class="mb-8">
    <h1 class="text-2xl font-bold text-gray-800">Gestión de Pedidos</h1>
    <p class="text-gray-600">Revisa y gestiona los pedidos recibidos</p>
  </div>
  
  <div class="bg-white rounded-xl shadow-sm p-8 text-center">
    <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <ShoppingBag class="w-12 h-12 text-gray-400" />
    </div>
    <h3 class="text-xl font-semibold text-gray-700 mb-2">Gestión de Pedidos</h3>
    <p class="text-gray-500 mb-6">
      Esta sección está en desarrollo. Aquí podrás gestionar todos los pedidos recibidos.
    </p>
    <div class="space-y-4 max-w-md mx-auto">
      {#each pedidos as pedido}
        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div>
            <p class="font-medium">Pedido #{pedido.id}</p>
            <p class="text-sm text-gray-600">{pedido.cliente}</p>
          </div>
          <span class={`px-3 py-1 rounded-full text-sm ${
            pedido.estado === 'Completado' ? 'bg-green-100 text-green-800' :
            pedido.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {pedido.estado}
          </span>
        </div>
      {/each}
    </div>
  </div>
</div>