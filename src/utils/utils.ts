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