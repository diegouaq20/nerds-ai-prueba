// Función auxiliar: invierte una cadena
function reverseString(str) {
  return str.split('').reverse().join('');
}

// Función auxiliar: procesa el paréntesis más interno
function reverseInnermostParentheses(text) {
  const closeIndex = text.indexOf(')');

  if (closeIndex === -1) return null;

  const openIndex = text.lastIndexOf('(', closeIndex);

  if (openIndex === -1) return null;

  const inside = text.slice(openIndex + 1, closeIndex);
  const reversed = reverseString(inside);

  return (
    text.slice(0, openIndex) +
    reversed +
    text.slice(closeIndex + 1)
  );
}

const textController = {
  process: (req, res) => {
    try {
      const { text } = req.body;

      // ✅ Validación
      if (!text || typeof text !== 'string') {
        return res.status(400).json({
          error: 'El campo "text" es requerido y debe ser un string',
        });
      }

      const steps = [text];
      let current = text;

      // ✅ Loop seguro
      while (current.includes('(')) {
        const next = reverseInnermostParentheses(current);

        if (!next) break; // evita errores si algo falla

        current = next;
        steps.push(current);
      }

      return res.status(200).json({
        result: steps,
      });
    } catch (error) {
      console.error('Error en process:', error);

      return res.status(500).json({
        error: 'Error interno del servidor',
      });
    }
  },

  transform: (req, res) => {
    try {
      const { text } = req.body;

      if (!text || typeof text !== 'string') {
        return res.status(400).json({
          error: 'El campo "text" es requerido y debe ser un string',
        });
      }

      return res.status(200).json({
        result: text,
      });
    } catch (error) {
      console.error('Error en transform:', error);

      return res.status(500).json({
        error: 'Error interno del servidor',
      });
    }
  },
};

module.exports = textController;