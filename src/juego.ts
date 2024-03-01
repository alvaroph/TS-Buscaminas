class Juego {
    tablero: Tablero;
    celdasSinMina: number;
    celdasReveladas: number = 0;

    constructor(filas: number, columnas: number) {
        this.tablero = new Tablero(filas, columnas);
        //this.celdasSinMina = filas * columnas - this.contarMinas();
        this.renderTablero();
    }

    
    renderTablero() {
        const elementoJuego = document.getElementById('juego');
        elementoJuego.innerHTML = ''; // Limpiar tablero actual
    
        // Crear y agregar las celdas al tablero HTML
        for (let i = 0; i < this.tablero.filas; i++) {
            const filaElemento = document.createElement('tr'); // Crear fila
            for (let j = 0; j < this.tablero.columnas; j++) {
                const celdaElemento = document.createElement('td'); // Crear celda
                celdaElemento.id = `celda-${i}-${j}`; // Añadir identificador a la celda
                celdaElemento.classList.add('celda');
    
                // Añadir imagen a la celda
                const imagenElemento = document.createElement('img');
                imagenElemento.src = 'img/open0.gif'; // Reemplaza esto con la ruta a la imagen que quieras usar
                celdaElemento.appendChild(imagenElemento);
    
                // Añadir event listener para el evento de click
                celdaElemento.addEventListener('click', () => this.visitarCasilla(i, j));
    
                filaElemento.appendChild(celdaElemento); // Añadir celda a la fila
            }
            elementoJuego?.appendChild(filaElemento); // Añadir fila al tablero
        }
    }
    visitarCasilla(fila: number, columna: number) {
        const celda = this.tablero.celdas[fila][columna];
        if (celda.marcada || celda.revelada) return; // Ignorar si la celda ya está marcada o revelada

        if (celda.esMina) {
            alert('¡Boom! Fin del juego.');
            location.reload(); // Recargar la página para reiniciar el juego
        } else {
            celda.revelada = true;
            this.celdasReveladas++;
            this.verificarVictoria();
            // Aquí se debe actualizar la UI para mostrar que la celda está revelada
        }
    }

    verificarVictoria() {
        if (this.celdasReveladas === this.celdasSinMina || this.todasLasMinasMarcadas()) {
            alert('¡Felicidades, has ganado el juego!');
            location.reload(); // Recargar la página para reiniciar el juego
        }
    }
   contarMinas(): number {
        let totalMinas = 0;
        for (let i = 0; i < this.tablero.filas; i++) {
            for (let j = 0; j < this.tablero.columnas; j++) {
                if (this.tablero.celdas[i][j].esMina) {
                    totalMinas++;
                }
            }
        }
        return totalMinas;
    }

   

    marcarCelda(fila: number, columna: number) {
        const celda = this.tablero.celdas[fila][columna];
        if (celda.revelada) return; // No se puede marcar una celda ya revelada

        celda.marcada = !celda.marcada; // Alternar estado marcado
        // Aquí se debe actualizar la UI para reflejar el cambio
        this.verificarVictoria();
    }

  

    todasLasMinasMarcadas(): boolean {
        for (let i = 0; i < this.tablero.filas; i++) {
            for (let j = 0; j < this.tablero.columnas; j++) {
                const celda = this.tablero.celdas[i][j];
                if (celda.esMina && !celda.marcada) return false;
            }
        }
        return true;
    }
}

