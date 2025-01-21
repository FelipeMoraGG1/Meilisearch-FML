// Ruta de API en Next.js. Más información en la documentación oficial:
// https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // Esta función maneja las solicitudes entrantes a esta ruta de API.
  // `req` contiene la solicitud HTTP entrante.
  // `res` se utiliza para enviar una respuesta al cliente.

  res.status(200).json({ name: "John Doe" }); 
  // Respuesta HTTP con código de estado 200 (éxito).
  // Enviamos un objeto JSON como respuesta, en este caso con un campo `name`.
}
