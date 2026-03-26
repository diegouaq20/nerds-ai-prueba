// 1. Invierte string
function reverseString(str) {
  return str.split('').reverse().join('');
}

// 2. Procesa paréntesis más interno
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

// 3. Capitalización alternada
function alternatingCaps(text) {
    console.log('ENTRO A alternatingCaps NUEVA');
  let letterIndex = 0;

  return text
    .split('')
    .map((char) => {
      if (!/[a-zA-Z]/.test(char)) {
        // reinicia al encontrar separadores
        if (char === ' ' || /[^\w]/.test(char)) {
          letterIndex = 0;
        }
        return char;
      }

      const result =
        letterIndex % 2 === 0 ? char.toUpperCase() : char.toLowerCase();

      letterIndex++;
      return result;
    })
    .join('');
}

// 4. Reemplazo de vocales
function replaceVowels(text) {
  const vowelMap = {
    a: 'e',
    e: 'i',
    i: 'o',
    o: 'u',
    u: 'a',
    A: 'E',
    E: 'I',
    I: 'O',
    O: 'U',
    U: 'A',
  };

  return text
    .split('')
    .map((char) => vowelMap[char] || char)
    .join('');
}

// 5. Palabras unicas (case insensitive)
function getUniqueWords(text) {
  const words = text.match(/[a-zA-Z]+/g) || [];
  const frequency = {};

  words.forEach((word) => {
    const normalized = word.toLowerCase();
    frequency[normalized] = (frequency[normalized] || 0) + 1;
  });

  return words.filter((word) => frequency[word.toLowerCase()] === 1);
}

// Controller

const textController = {
  // /text/process
  process: (req, res) => {
    try {
      const { text } = req.body;

      // Validación
      if (!text || typeof text !== 'string') {
        return res.status(400).json({
          error: 'El campo "text" es requerido y debe ser un string',
        });
      }

      const steps = [text];
      let current = text;

      while (current.includes('(')) {
        const next = reverseInnermostParentheses(current);

        if (!next) break;

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

  //  /text/transform
  transform: (req, res) => {
    try {
      const { text } = req.body;

      if (!text || typeof text !== 'string') {
        return res.status(400).json({
          error: 'El campo "text" es requerido y debe ser un string',
        });
      }

      return res.status(200).json({
        alternating_caps: alternatingCaps(text),
        vowel_replacement: replaceVowels(text),
        unique_words: getUniqueWords(text),
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