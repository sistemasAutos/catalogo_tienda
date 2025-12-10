<script>
  import { Store, Phone, Mail, MapPin, Clock } from 'lucide-svelte';
  import { configuracion } from '$lib/data/config';
</script>

<footer class="bg-gray-800 text-white mt-16">
  <div class="container mx-auto px-4 py-12">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Logo y descripción -->
      <div class="md:col-span-2">
        <div class="flex items-center space-x-2 mb-4">
          <Store class="w-8 h-8" />
          <span class="text-xl font-bold">{configuracion.nombre_empresa}</span>
        </div>
        <p class="text-gray-300 mb-4 max-w-md">
          {configuracion.descripcion_empresa}. Realiza tus pedidos fácilmente por WhatsApp y coordina la entrega directamente con nosotros.
        </p>
      </div>
      
      <!-- Contacto -->
      <div>
        <h3 class="font-bold text-lg mb-4">Contacto</h3>
        <ul class="space-y-3">
          <li class="flex items-center space-x-3">
            <Phone class="w-5 h-5 text-primary-400" />
            <a href={`https://wa.me/${configuracion.whatsapp_numero}`} 
               class="hover:text-primary-300 transition-colors"
               target="_blank">
              WhatsApp: {configuracion.whatsapp_numero}
            </a>
          </li>
          <li class="flex items-center space-x-3">
            <Mail class="w-5 h-5 text-primary-400" />
            <span>info@catalogoexpress.com</span>
          </li>
        </ul>
      </div>
      
      <!-- Información -->
      <div>
        <h3 class="font-bold text-lg mb-4">Información</h3>
        <ul class="space-y-3">
          <li class="flex items-center space-x-3">
            <MapPin class="w-5 h-5 text-primary-400" />
            <span>{configuracion.direccion}</span>
          </li>
          <li class="flex items-center space-x-3">
            <Clock class="w-5 h-5 text-primary-400" />
            <span>{configuracion.horario_atencion}</span>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Derechos reservados -->
    <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
      <p>&copy; {new Date().getFullYear()} {configuracion.nombre_empresa}. Todos los derechos reservados.</p>
      <p class="text-sm mt-2">Sistema de catálogo con pedidos por WhatsApp</p>
    </div>
  </div>
</footer>