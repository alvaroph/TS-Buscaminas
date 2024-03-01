class Tablero {
    celdas: Celda[][];
    filas: number;
    columnas: number;

    constructor(filas: number, columnas: number) {
        this.filas = filas;
        this.columnas = columnas;
        this.celdas = this.inicializarCeldas();
    }

    inicializarCeldas(): Celda[][] {
        let celdas = [];
        for (let i = 0; i < this.filas; i++) {
            let fila: Celda[] = [];
            for (let j = 0; j < this.columnas; j++) {
                // Asumimos una probabilidad del 20% de que sea una mina
                const tieneBomba: boolean = Math.random() < 0.2;
                fila.push(new Celda(tieneBomba));
            }
            celdas.push(fila);
        }
        console.table(celdas)
        return celdas;
    }

    imprimirTablero() {
        for (let i = 0; i < this.filas; i++) {
            let fila = '';
            for (let j = 0; j < this.columnas; j++) {
                fila += this.celdas[i][j].esMina ? 'X' : 'O';
            }
            console.log(fila);
        }
    }
}
