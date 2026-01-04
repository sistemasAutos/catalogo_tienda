
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/(auth)" | "/(admin)" | "/" | "/api" | "/api/categorias" | "/api/configuracion" | "/api/marcas" | "/api/pedidos" | "/api/productos" | "/api/test" | "/carrito" | "/(admin)/categorias" | "/(admin)/configuracion" | "/(admin)/dashboard" | "/(auth)/login" | "/logout" | "/(admin)/marcas" | "/(admin)/marcas/nuevo" | "/(admin)/marcas/[id]" | "/(admin)/marcas/[id]/editar" | "/(admin)/mensajes" | "/(admin)/pedidos" | "/(admin)/productos" | "/(admin)/productos/nuevo" | "/(admin)/productos/[id]" | "/(admin)/productos/[id]/editar";
		RouteParams(): {
			"/(admin)/marcas/[id]": { id: string };
			"/(admin)/marcas/[id]/editar": { id: string };
			"/(admin)/productos/[id]": { id: string };
			"/(admin)/productos/[id]/editar": { id: string }
		};
		LayoutParams(): {
			"/(auth)": Record<string, never>;
			"/(admin)": { id?: string };
			"/": { id?: string };
			"/api": Record<string, never>;
			"/api/categorias": Record<string, never>;
			"/api/configuracion": Record<string, never>;
			"/api/marcas": Record<string, never>;
			"/api/pedidos": Record<string, never>;
			"/api/productos": Record<string, never>;
			"/api/test": Record<string, never>;
			"/carrito": Record<string, never>;
			"/(admin)/categorias": Record<string, never>;
			"/(admin)/configuracion": Record<string, never>;
			"/(admin)/dashboard": Record<string, never>;
			"/(auth)/login": Record<string, never>;
			"/logout": Record<string, never>;
			"/(admin)/marcas": { id?: string };
			"/(admin)/marcas/nuevo": Record<string, never>;
			"/(admin)/marcas/[id]": { id: string };
			"/(admin)/marcas/[id]/editar": { id: string };
			"/(admin)/mensajes": Record<string, never>;
			"/(admin)/pedidos": Record<string, never>;
			"/(admin)/productos": { id?: string };
			"/(admin)/productos/nuevo": Record<string, never>;
			"/(admin)/productos/[id]": { id: string };
			"/(admin)/productos/[id]/editar": { id: string }
		};
		Pathname(): "/" | "/api" | "/api/" | "/api/categorias" | "/api/categorias/" | "/api/configuracion" | "/api/configuracion/" | "/api/marcas" | "/api/marcas/" | "/api/pedidos" | "/api/pedidos/" | "/api/productos" | "/api/productos/" | "/api/test" | "/api/test/" | "/carrito" | "/carrito/" | "/categorias" | "/categorias/" | "/configuracion" | "/configuracion/" | "/dashboard" | "/dashboard/" | "/login" | "/login/" | "/logout" | "/logout/" | "/marcas" | "/marcas/" | "/marcas/nuevo" | "/marcas/nuevo/" | `/marcas/${string}` & {} | `/marcas/${string}/` & {} | `/marcas/${string}/editar` & {} | `/marcas/${string}/editar/` & {} | "/mensajes" | "/mensajes/" | "/pedidos" | "/pedidos/" | "/productos" | "/productos/" | "/productos/nuevo" | "/productos/nuevo/" | `/productos/${string}` & {} | `/productos/${string}/` & {} | `/productos/${string}/editar` & {} | `/productos/${string}/editar/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}
