import { writable, derived } from 'svelte/store';

// Store principal del carrito
function createCarritoStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    
    // Agregar producto al carrito
    agregarProducto: (producto, cantidad = 1) => {
      update(items => {
        const existingIndex = items.findIndex(item => item.id === producto.id);
        
        if (existingIndex >= 0) {
          // Actualizar cantidad si ya existe
          const updatedItems = [...items];
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            cantidad: updatedItems[existingIndex].cantidad + cantidad
          };
          return updatedItems;
        } else {
          // Agregar nuevo item
          return [...items, {
            ...producto,
            cantidad,
            precio_unitario: producto.precio
          }];
        }
      });
    },
    
    // Eliminar producto del carrito
    eliminarProducto: (productoId) => {
      update(items => items.filter(item => item.id !== productoId));
    },
    
    // Actualizar cantidad de un producto
    actualizarCantidad: (productoId, cantidad) => {
      update(items => {
        if (cantidad <= 0) {
          return items.filter(item => item.id !== productoId);
        }
        return items.map(item => 
          item.id === productoId ? { ...item, cantidad } : item
        );
      });
    },
    
    // Limpiar todo el carrito
    limpiarCarrito: () => {
      set([]);
    },
    
    // Obtener un producto específico
    obtenerProducto: (productoId) => {
      let producto;
      update(items => {
        producto = items.find(item => item.id === productoId);
        return items;
      });
      return producto;
    }
  };
}

export const carrito = createCarritoStore();

// Store derivado: cantidad total de items
export const cantidadItems = derived(
  carrito,
  $carrito => $carrito.reduce((total, item) => total + item.cantidad, 0)
);

// Store derivado: subtotal (sin impuestos)
export const subtotal = derived(
  carrito,
  $carrito => $carrito.reduce((total, item) => 
    total + (item.precio_unitario * item.cantidad), 0
  )
);

// Store derivado: total con impuestos
export const totalConImpuestos = derived(
  [subtotal],
  ([$subtotal]) => {
    // Por defecto 18% de impuesto, luego se configurará desde la DB
    const impuesto = 0.18;
    return $subtotal * (1 + impuesto);
  }
);

// Store derivado: verificar si el carrito está vacío
export const carritoVacio = derived(
  carrito,
  $carrito => $carrito.length === 0
);