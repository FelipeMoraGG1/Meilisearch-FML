// Importamos los estilos globales para la aplicación
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  // El componente App es el contenedor principal de la aplicación Next.js.
  // `Component` representa la página específica que se está cargando.
  // `pageProps` contiene las propiedades que se pasan a esa página.
  return <Component {...pageProps} />; // Renderizamos la página actual con sus propiedades.
}
