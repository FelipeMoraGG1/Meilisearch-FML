// Importamos la librería MeiliSearch para interactuar con el cliente de búsqueda
import { MeiliSearch } from 'meilisearch';

// Configuramos el cliente de MeiliSearch con el host y la clave API
const client = new MeiliSearch({
  host: 'http://172.236.225.88', // Dirección del servidor MeiliSearch
  apiKey: 'a39f8477da24b1ae3b9394e646d63fd3caf9bdde8120ef1d90576ba3535d', // Clave API para autenticar las solicitudes
});

export default async function handler(req, res) {
  // Verificamos si el método de la solicitud es GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' }); // Enviamos un error 405 si no es GET
  }

  // Extraemos el parámetro `q` (término de búsqueda) de la solicitud
  const { q } = req.query;
  if (!q || q.trim() === '') {
    return res.status(400).json({ error: 'El parámetro de búsqueda es requerido' }); // Error si no se proporciona un término válido
  }

  try {
    // Obtenemos el índice llamado 'movies' en el servidor MeiliSearch
    const index = client.index('movies'); // Asegúrate de que 'movies' exista en tu configuración

    // Realizamos la búsqueda en el índice con el término `q`
    const resultados = await index.search(q, {
      attributesToRetrieve: ['title', 'overview', 'genres', 'poster', 'release_date'], // Campos que queremos obtener
    });

    // Enviamos los resultados de la búsqueda como respuesta
    res.status(200).json(resultados);
  } catch (error) {
    // Capturamos y manejamos cualquier error durante la búsqueda
    console.error('Error en la búsqueda:', error);
    res.status(500).json({ error: 'Error al realizar la búsqueda' }); // Error 500 en caso de fallos internos
  }
}
