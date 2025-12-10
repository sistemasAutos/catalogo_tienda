<script>
  import { Settings, Save, Upload } from 'lucide-svelte';
  
  let configuracion = {
    nombre_empresa: 'CatálogoExpress',
    whatsapp_numero: '51987654321',
    moneda_simbolo: 'S/',
    impuesto_porcentaje: 18,
    direccion: 'Av. Principal 123, Lima',
    horario_atencion: 'Lunes a Viernes: 9am - 6pm'
  };
</script>

<div class="p-6">
  <div class="mb-8">
    <h1 class="text-2xl font-bold text-gray-800">Configuración de la Tienda</h1>
    <p class="text-gray-600">Personaliza los datos de tu negocio y preferencias</p>
  </div>
  
  <div class="bg-white rounded-xl shadow-sm p-6">
    <form class="space-y-6">
      <!-- Información básica -->
      <div>
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Información del Negocio</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="label">Nombre de la empresa</label>
            <input
              type="text"
              bind:value={configuracion.nombre_empresa}
              class="input"
            />
          </div>
          <div>
            <label class="label">Número de WhatsApp</label>
            <input
              type="text"
              bind:value={configuracion.whatsapp_numero}
              class="input"
              placeholder="51987654321"
            />
            <p class="text-sm text-gray-500 mt-1">Incluye código de país sin el +</p>
          </div>
          <div>
            <label class="label">Símbolo de moneda</label>
            <input
              type="text"
              bind:value={configuracion.moneda_simbolo}
              class="input"
              placeholder="S/ o $"
            />
          </div>
          <div>
            <label class="label">Impuesto (%)</label>
            <input
              type="number"
              bind:value={configuracion.impuesto_porcentaje}
              class="input"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
        </div>
      </div>
      
      <!-- Información adicional -->
      <div>
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Información Adicional</h2>
        <div class="grid grid-cols-1 gap-6">
          <div>
            <label class="label">Dirección</label>
            <input
              type="text"
              bind:value={configuracion.direccion}
              class="input"
            />
          </div>
          <div>
            <label class="label">Horario de atención</label>
            <input
              type="text"
              bind:value={configuracion.horario_atencion}
              class="input"
            />
          </div>
        </div>
      </div>
      
      <!-- Logo de la empresa -->
      <div>
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Logo de la Empresa</h2>
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-600 mb-2">Arrastra tu logo aquí o haz clic para subir</p>
          <p class="text-sm text-gray-500">PNG, JPG hasta 2MB. Tamaño recomendado: 300x300px</p>
          <button type="button" class="btn-outline mt-4">
            Seleccionar archivo
          </button>
        </div>
      </div>
      
      <!-- Botones de acción -->
      <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button type="button" class="btn-secondary">
          Restablecer
        </button>
        <button type="submit" class="btn-primary flex items-center">
          <Save class="w-5 h-5 mr-2" />
          Guardar Cambios
        </button>
      </div>
    </form>
  </div>
</div>