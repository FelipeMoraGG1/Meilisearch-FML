// Importamos componentes de Next.js necesarios para estructurar el documento HTML
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  // Este componente se utiliza para personalizar el documento HTML que se sirve al cliente.
  // Es útil para definir elementos que deben estar presentes en todas las páginas, como el idioma, meta tags adicionales, etc.
  return (
    <Html lang="en"> {/* Etiqueta HTML principal con el atributo de idioma configurado en inglés */}
      <Head /> {/* Sección para incluir metadatos, enlaces a fuentes, íconos, etc. */}
      <body>
        <Main /> {/* Renderiza el contenido principal de la página */}
        <NextScript /> {/* Incluye los scripts necesarios para que Next.js funcione correctamente */}
      </body>
    </Html>
  );
}
