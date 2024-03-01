"use strict";
var Tablero = /** @class */ (function () {
    function Tablero(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.celdas = this.inicializarCeldas();
    }
    Tablero.prototype.inicializarCeldas = function () {
        var celdas = [];
        for (var i = 0; i < this.filas; i++) {
            var fila = [];
            for (var j = 0; j < this.columnas; j++) {
                // Asumimos una probabilidad del 20% de que sea una mina
                var tieneBomba = Math.random() < 0.2;
                fila.push(new Celda(tieneBomba));
            }
            celdas.push(fila);
        }
        console.table(celdas);
        return celdas;
    };
    Tablero.prototype.imprimirTablero = function () {
        for (var i = 0; i < this.filas; i++) {
            var fila = '';
            for (var j = 0; j < this.columnas; j++) {
                fila += this.celdas[i][j].esMina ? 'X' : 'O';
            }
            console.log(fila);
        }
    };
    return Tablero;
}());
//# sourceMappingURL=tablero.js.map