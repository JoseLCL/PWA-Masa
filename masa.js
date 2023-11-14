const cantidadInput = document.getElementById('cantidad');
const unidadOrigenSelect = document.getElementById('unidadOrigen');
const unidadDestinoSelect = document.getElementById('unidadDestino');
const resultadoOutput = document.getElementById('resultado');

function convertirMasa(cantidad, unidadOrigen, unidadDestino) {

    if (unidadOrigen === unidadDestino) {
        return cantidad;
    }

  const conversiones = {
    'gramos-kilogramos': cantidad => cantidad / 1000,
    'gramos-onzas': cantidad => cantidad * 0.03527396,
    'gramos-libras': cantidad => cantidad * 0.00220462,
    'kilogramos-gramos': cantidad => cantidad * 1000,
    'kilogramos-onzas': cantidad => cantidad * 35.27396,
    'kilogramos-libras': cantidad => cantidad * 2.20462,
    'onzas-gramos': cantidad => cantidad / 0.03527396,
    'onzas-kilogramos': cantidad => cantidad / 35.27396,
    'onzas-libras': cantidad => cantidad * 0.0625,
    'libras-gramos': cantidad => cantidad / 0.00220462,
    'libras-kilogramos': cantidad => cantidad / 2.20462,
    'libras-onzas': cantidad => cantidad / 0.0625,
  };

  const conversionKey = `${unidadOrigen}-${unidadDestino}`;
  if (!conversiones.hasOwnProperty(conversionKey)) {
    throw new Error('Unidad de conversión no válida');
  }

  return conversiones[conversionKey](cantidad);
}

function actualizarResultado() {
  const cantidad = parseFloat(cantidadInput.value);
  const unidadOrigen = unidadOrigenSelect.value;
  const unidadDestino = unidadDestinoSelect.value;

  try {
    const resultado = convertirMasa(cantidad, unidadOrigen, unidadDestino);
    resultadoOutput.textContent = resultado.toFixed(3) + ' ' + unidadDestino.toUpperCase();
  } catch (error) {
    resultadoOutput.textContent = 'Error: ' + error.message;
  }
}

// Actualizar resultado al cambiar los valores
cantidadInput.addEventListener('input', actualizarResultado);
unidadOrigenSelect.addEventListener('input', actualizarResultado);
unidadDestinoSelect.addEventListener('input', actualizarResultado);
