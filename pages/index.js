import { useState, useEffect } from 'react'; // Importamos los hooks de React
import styles from '@/styles/Home.module.css'; // Importamos los estilos CSS específicos de la página

export default function Home() {
  // Declaración de estados
  const [query, setQuery] = useState(''); // Estado para almacenar el término de búsqueda ingresado por el usuario
  const [results, setResults] = useState([]); // Estado para almacenar los resultados de la búsqueda
  const [loading, setLoading] = useState(false); // Estado para indicar si la búsqueda está en progreso
  const [error, setError] = useState(''); // Estado para almacenar mensajes de error

  // Hook que se ejecuta cada vez que el valor de `query` cambia
  useEffect(() => {
    // Si el término de búsqueda está vacío, limpiamos los resultados
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    // Función asíncrona para realizar la búsqueda
    const fetchResults = async () => {
      setLoading(true); // Indicamos que la búsqueda está en progreso
      setError(''); // Limpiamos cualquier error previo

      try {
        // Realizamos una solicitud GET a la API con el término de búsqueda
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Error en la búsqueda'); // Si la respuesta no es válida, lanzamos un error

        const data = await response.json(); // Convertimos la respuesta a JSON
        setResults(data.hits || []); // Guardamos los resultados obtenidos (o un arreglo vacío si no hay resultados)
      } catch (error) {
        // Manejamos cualquier error durante la solicitud
        setError('Hubo un problema al realizar la búsqueda.');
        console.error('Error:', error);
      } finally {
        setLoading(false); // Terminamos el estado de carga
      }
    };

    // Configuramos un temporizador para esperar 500ms antes de realizar la búsqueda (debounce)
    const delayDebounceFn = setTimeout(() => {
      fetchResults(); // Llamamos a la función de búsqueda después del retraso
    }, 500);

    // Limpiamos el temporizador si el usuario escribe nuevamente antes de que termine el tiempo
    return () => clearTimeout(delayDebounceFn);
  }, [query]); // Dependencia: el efecto se ejecuta cada vez que `query` cambia

  // JSX que define la estructura visual del componente
  return (
    <div className={styles.container}>
      <h1>Búsqueda de Películas</h1>
      {/* Campo de entrada para el término de búsqueda */}
      <input
        type="text"
        value={query} // Valor controlado por el estado `query`
        onChange={(e) => setQuery(e.target.value)} // Actualizamos el estado con el valor ingresado por el usuario
        placeholder="Buscar películas..."
        className={styles.input} // Clase de estilo CSS
      />

      {/* Mensajes de estado */}
      {loading && <p className={styles.loading}>Buscando...</p>} {/* Indicador de carga */}
      {error && <p className={styles.error}>{error}</p>} {/* Mensaje de error */}

      {/* Contenedor de resultados */}
      <div className={styles.grid}>
        {results.length > 0 ? (
          // Si hay resultados, los mostramos en tarjetas
          results.map((result, index) => (
            <div key={index} className={styles.card}>
              <img src={result.poster} alt={result.title} className={styles.image} /> {/* Imagen del resultado */}
              <h2>{result.title}</h2> {/* Título de la película */}
              <p><strong>Género:</strong> {result.genres.join(', ')}</p> {/* Géneros */}
              <p><strong>Estreno:</strong> {new Date(result.release_date * 1000).toLocaleDateString()}</p> {/* Fecha de estreno */}
              <p>{result.overview}</p> {/* Descripción */}
            </div>
          ))
        ) : (
          // Si no hay resultados y no está cargando, mostramos un mensaje
          !loading && query && <p className={styles.noResults}>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
}

