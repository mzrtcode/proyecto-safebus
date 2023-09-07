export function formatoHoraAmPm(fechaHora: Date): string {
    const hora: number = fechaHora.getHours();
    const minutos: number = fechaHora.getMinutes();
    const amPm: string = hora >= 12 ? 'PM' : 'AM';
    const hora12: number = hora % 12 || 12;
    const horaFormateada: string = `${hora12}:${minutos < 10 ? '0' : ''}${minutos} ${amPm}`;
    return horaFormateada;
}