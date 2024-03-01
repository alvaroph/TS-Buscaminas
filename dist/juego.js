"use strict";
var Juego = /** @class */ (function () {
    function Juego(filas, columnas) {
        this.celdasReveladas = 0;
        this.tablero = new Tablero(filas, columnas);
        //this.celdasSinMina = filas * columnas - this.contarMinas();
        this.renderTablero();
    }
    Juego.prototype.renderTablero = function () {
        var elementoJuego = document.getElementById('juego');
        elementoJuego.innerHTML = ''; // Limpiar tablero actual
        // Crear y agregar las celdas al tablero HTML
        for (var i = 0; i < this.tablero.filas; i++) {
            for (var j = 0; j < this.tablero.columnas; j++) {
                var celdaElemento = document.createElement('div');
                celdaElemento.classList.add('celda');
                //   celdaElemento.addEventListener('click', () => this.revelarCelda(i, j));
                elementoJuego === null || elementoJuego === void 0 ? void 0 : elementoJuego.appendChild(celdaElemento);
            }
        }
    };
    return Juego;
}());
//# sourceMappingURL=juego.js.map