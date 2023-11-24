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



/**
* Genera una tabla centrada a partir de títulos y datos proporcionados.
*
* @param {string[]} titulos - Los títulos de las columnas.
* @param {string[][]} datos - Los datos para llenar la tabla.
* @returns {string} La tabla centrada como una cadena de texto.
*
* @example
* const titulos = ['Nombre', 'Edad', 'Ciudad'];
* const datos = [
*   ['Juan', '25', 'Ciudad A'],
*   ['Ana', '30', 'Ciudad B'],
*   ['Carlos', '28', 'Ciudad C'],
* ];
*
* console.log(generarTablaCentrada(titulos, datos));
*
* // Salida esperada:
* //  Nombre  | Edad |  Ciudad
* //  Juan    |  25  |Ciudad A
* //  Ana     |  30  |Ciudad B
* // Carlos   |  28  |Ciudad C
*/
export const generarTablaCentrada = (titulos: string[], datos: Datos): string[] => {
  const longitudTotal: number = 44;

  // Calcular la longitud máxima permitida para cada columna
  const longitudMaximaColumnas: Record<string, number> = titulos.reduce((longitudes, titulo) => {
    const longitudTitulo: number = titulo.length;
    const longitudMaximaValores: number = datos.reduce((maximo, fila) => {
      const valor: string = (fila[titulo] || '').toString();
      return Math.max(maximo, valor.length);
    }, 0);
    const longitudMaxima: number = Math.max(longitudTitulo, longitudMaximaValores);
    longitudes[titulo] = Math.min(longitudMaxima, Math.floor((longitudTotal + titulos.length - 1) / titulos.length)); // Asegurar que no exceda la longitud total
    return longitudes;
  }, {});

  // Función para centrar un texto en una columna con espacio alrededor
  const centrarEnColumna = (texto: string, longitudMaxima: number): string => {
    const espacioAlrededor: number = Math.max(1, (longitudMaxima - texto.length) / 2);
    return ' '.repeat(Math.floor(espacioAlrededor)) + texto + ' '.repeat(Math.ceil(espacioAlrededor));
  };

  // Construir la primera línea con los títulos
  const primeraLinea: string = titulos.map((titulo, index) => {
    const longitudMaxima: number = longitudMaximaColumnas[titulo];
    return centrarEnColumna(titulo, longitudMaxima);
  }).join(' '.repeat(Math.max(1, titulos.length - 1))); // Separador de espacio entre títulos, mínimo 1 espacio

  // Función para generar una fila centrada
  const generarFilaCentrada = (valores: string[]): string => {
    return titulos.map((titulo, index) => {
      const valor: string = (valores[index] || '').toString().slice(0, longitudMaximaColumnas[titulo]); // Cortar el valor si es demasiado largo
      return centrarEnColumna(valor, longitudMaximaColumnas[titulo]);
    }).join(' '.repeat(Math.max(1, titulos.length - 1))); // Separador de espacio entre valores, mínimo 1 espacio
  };

  // Construir la tabla
  const tabla: string[] = [primeraLinea];

  datos.forEach((valores: string[]) => {
    const valoresRecortados: string[] = valores.slice(0, titulos.length); // Recortar valores para que no excedan el número de títulos
    const filaCentrada: string = generarFilaCentrada(valoresRecortados);
    tabla.push(filaCentrada);
  });

  // Asegurar que la longitud total se respete
  return tabla.map(fila => fila.slice(0, longitudTotal));
};


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