"use strict";
var Juego = /** @class */ (function () {
    function Juego(filas, columnas) {
        this.celdasReveladas = 0;
        this.tablero = new Tablero(filas, columnas);
        //this.celdasSinMina = filas * columnas - this.contarMinas();
        this.renderTablero();
    }
    Juego.prototype.renderTablero = function () {
        var _this = this;
        var elementoJuego = document.getElementById('juego');
        elementoJuego.innerHTML = ''; // Limpiar tablero actual
        var _loop_1 = function (i) {
            var filaElemento = document.createElement('tr'); // Crear fila
            var _loop_2 = function (j) {
                var celdaElemento = document.createElement('td'); // Crear celda
                celdaElemento.id = "celda-".concat(i, "-").concat(j); // Añadir identificador a la celda
                celdaElemento.classList.add('celda');
                // Añadir imagen a la celda
                var imagenElemento = document.createElement('img');
                imagenElemento.src = 'img/open0.gif'; // Reemplaza esto con la ruta a la imagen que quieras usar
                celdaElemento.appendChild(imagenElemento);
                // Añadir event listener para el evento de click
                celdaElemento.addEventListener('click', function () { return _this.visitarCasilla(i, j); });
                filaElemento.appendChild(celdaElemento); // Añadir celda a la fila
            };
            for (var j = 0; j < this_1.tablero.columnas; j++) {
                _loop_2(j);
            }
            elementoJuego === null || elementoJuego === void 0 ? void 0 : elementoJuego.appendChild(filaElemento); // Añadir fila al tablero
        };
        var this_1 = this;
        // Crear y agregar las celdas al tablero HTML
        for (var i = 0; i < this.tablero.filas; i++) {
            _loop_1(i);
        }
    };
    Juego.prototype.visitarCasilla = function (fila, columna) {
        var celda = this.tablero.celdas[fila][columna];
        if (celda.marcada || celda.revelada)
            return; // Ignorar si la celda ya está marcada o revelada
        if (celda.esMina) {
            alert('¡Boom! Fin del juego.');
            location.reload(); // Recargar la página para reiniciar el juego
        }
        else {
            celda.revelada = true;
            this.celdasReveladas++;
            this.verificarVictoria();
            // Aquí se debe actualizar la UI para mostrar que la celda está revelada
        }
    };
    Juego.prototype.verificarVictoria = function () {
        if (this.celdasReveladas === this.celdasSinMina || this.todasLasMinasMarcadas()) {
            alert('¡Felicidades, has ganado el juego!');
            location.reload(); // Recargar la página para reiniciar el juego
        }
    };
    Juego.prototype.contarMinas = function () {
        var totalMinas = 0;
        for (var i = 0; i < this.tablero.filas; i++) {
            for (var j = 0; j < this.tablero.columnas; j++) {
                if (this.tablero.celdas[i][j].esMina) {
                    totalMinas++;
                }
            }
        }
        return totalMinas;
    };
    Juego.prototype.marcarCelda = function (fila, columna) {
        var celda = this.tablero.celdas[fila][columna];
        if (celda.revelada)
            return; // No se puede marcar una celda ya revelada
        celda.marcada = !celda.marcada; // Alternar estado marcado
        // Aquí se debe actualizar la UI para reflejar el cambio
        this.verificarVictoria();
    };
    Juego.prototype.todasLasMinasMarcadas = function () {
        for (var i = 0; i < this.tablero.filas; i++) {
            for (var j = 0; j < this.tablero.columnas; j++) {
                var celda = this.tablero.celdas[i][j];
                if (celda.esMina && !celda.marcada)
                    return false;
            }
        }
        return true;
    };
    return Juego;
}());
//# sourceMappingURL=juego.js.map