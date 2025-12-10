export function load({ cookies }) {
  // En una implementación real, verificaríamos un token JWT en las cookies
  // Por ahora, esto es solo un esqueleto para estructura futura
  
  return {
    // Datos básicos para el dashboard
    dashboardInfo: {
      version: '1.0.0',
      lastUpdated: new Date().toISOString()
    }
  };
}