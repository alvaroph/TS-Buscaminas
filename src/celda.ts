class Celda {
    esMina: boolean;
    revelada: boolean;
    marcada: boolean; // Indicador de si la celda está marcada con bandera

    constructor(esMina: boolean) {
        this.esMina = esMina;
        this.revelada = false;
        this.marcada = false; // Inicialmente, ninguna celda está marcada
    }
}
