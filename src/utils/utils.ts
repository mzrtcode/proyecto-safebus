export function formatoHoraAmPm(fechaHora: Date): string {
  const hora: number = fechaHora.getHours();
  const minutos: number = fechaHora.getMinutes();
  const amPm: string = hora >= 12 ? 'PM' : 'AM';
  const hora12: number = hora % 12 || 12;
  const horaFormateada: string = `${hora12}:${minutos < 10 ? '0' : ''}${minutos} ${amPm}`;
  return horaFormateada;
}

export function obtenerFechaYHoraActual(): string {
  const ahora = new Date();
  const mes = ahora.getMonth() + 1; // Los meses comienzan desde 0
  const anio = ahora.getFullYear();
  const horas = ahora.getHours();
  const minutos = ahora.getMinutes();

  // Formatea el mes y los minutos para que tengan dos dígitos
  const mesFormateado = mes < 10 ? `0${mes}` : mes;
  const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

  // Crea la cadena de fecha y hora en el formato mm/aaaa hh:mm
  const fechaYHora = `${mesFormateado}/${anio} ${horas}:${minutosFormateados}`;

  return fechaYHora;
}

export function formatearNumeroConComas(numero: number): string {
  if (typeof numero !== 'number') return ''
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export function obtenerFecha(fecha: Date): string {
  const mesesEnEspanol = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
  ];

  const mes = mesesEnEspanol[fecha.getMonth()];
  const dia = fecha.getDate();
  const año = fecha.getFullYear();

  // Ajustar el formato para tener un espacio adicional para los días de un solo dígito
  const diaFormateado = dia < 10 ? ` ${dia}` : `${dia}`;

  return `${mes} ${diaFormateado}/${año}`; "Jun 09/2023";
}



export function generarTabla(arrays: string[][]): string {
  const maxCaracteres: number[] = [20, 3, 9]; // Máximo de caracteres por columna
  const espaciosInicio: number = 1; // Espacios al inicio de cada fila
  const espaciosFin: number = 1; // Espacios al final de cada fila
  const espaciosEntreValores: number[] = [7, 3]; // Espacios entre valores
  const separador: string = '     '; // Espacio entre columnas

  // Función para ajustar la longitud de una cadena según el límite máximo
  const ajustarLongitud = (valor: string, max: number): string => {
      if (valor.length > max) {
          return valor.slice(0, max); // Cortar si excede el máximo
      } else {
          const espacios: string = ' '.repeat(max - valor.length);
          return valor + espacios; // Completar con espacios si es necesario
      }
  };

  // Función para generar una fila de la tabla
  const generarFila = (fila: string[]): string => {
      const valoresAjustados: string[] = fila.map((valor, indice) => {
          return ajustarLongitud(valor, maxCaracteres[indice]);
      });

      const filaConEspacios: string[] = [
          ' '.repeat(espaciosInicio),
          valoresAjustados[0],
          ' '.repeat(espaciosEntreValores[0]),
          valoresAjustados[1],
          ' '.repeat(espaciosEntreValores[1]),
          valoresAjustados[2],
          ' '.repeat(espaciosFin)
      ];

      return filaConEspacios.join('');
  };

  // Generar la tabla
  const cabecera: string = "         Ruta               Cant     Valor   \n---------------------------------------------";
  const contenido: string = arrays.map(generarFila).join('\n');

  // Imprimir la tabla
  return (cabecera + '\n' + contenido);
}

export function dividirPorSaltoDeLinea(texto: string): string[] {
  const lineas: string[] = texto.split('\n');
  return lineas;
}

/**
 * Calcula la hora de salida sumando 30 minutos a una fecha dada.
 *
 * @param {Date} fecha - La fecha de la cual se calculará la nueva hora de salida.
 * @returns {string} Una cadena en formato "hh:mm" representando la nueva hora de salida.
 */
export const calcularHoraSalida = (fecha: Date): string => {
  // Sumar 30 minutos en milisegundos para obtener la nueva fecha
  const nuevaFecha = new Date(fecha.getTime() + 30 * 60000);

  // Obtener las horas y minutos con formato de dos dígitos
  const horas = nuevaFecha.getHours().toString().padStart(2, '0');
  const minutos = nuevaFecha.getMinutes().toString().padStart(2, '0');

  // Retornar la nueva hora en formato "hh:mm"
  return `${horas}:${minutos}`;
};


export function generarTablaInformePlanillas(datos: string[][]): string {
  const maxCaracteres = [9, 4, 3, 3, 7]; // Máximo de caracteres por columna
  const espaciosEntreColumnas = [3, 3, 4, 4]; // Espacios entre columnas
  const separador = '     '; // Espacio entre columnas

  // Función para ajustar la longitud de una cadena según el límite máximo
  const ajustarLongitud = (valor: string, max: number): string => {
      if (valor.length > max) {
          return valor.slice(0, max); // Cortar si excede el máximo
      } else {
          const espaciosAntes = ' '.repeat(Math.floor((max - valor.length) / 2));
          const espaciosDespues = ' '.repeat(Math.ceil((max - valor.length) / 2));
          return espaciosAntes + valor + espaciosDespues; // Centrar agregando espacios antes y después
      }
  };

  // Función para generar una fila de la tabla
  const generarFila = (fila: string[]): string => {
      const valoresAjustados: string[] = fila.map((valor, indice) => {
          return ajustarLongitud(valor, maxCaracteres[indice]);
      });

      const filaConEspacios: string[] = [
          valoresAjustados[0],
          ' '.repeat(espaciosEntreColumnas[0]),
          valoresAjustados[1],
          ' '.repeat(espaciosEntreColumnas[1]),
          valoresAjustados[2],
          ' '.repeat(espaciosEntreColumnas[2]),
          valoresAjustados[3],
          ' '.repeat(espaciosEntreColumnas[3]),
          valoresAjustados[4],
      ];

      return filaConEspacios.join('');
  };

  // Generar la tabla
  const cabecera = "Planilla    Vehic  Ruta   Psj     Vr-Total \n--------------------------------------------";
  const contenido = datos.map(generarFila).join('\n');

  // Imprimir la tabla
  return (cabecera + '\n' + contenido);
}