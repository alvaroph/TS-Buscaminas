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
                imagenElemento.src = 'img/shadow0.gif'; // Reemplaza esto con la ruta a la imagen que quieras usar
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
        console.log("visitocasilla" + fila + " " + columna)
        console.log(celda)

        if (celda.marcada || celda.revelada)
         return; // Ignorar si la celda ya está marcada o revelada

        if (celda.esMina) {
            alert('¡Boom! Fin del juego.');
            location.reload(); // Recargar la página para reiniciar el juego
        } else {
            celda.revelada = true;
            this.celdasReveladas++;
            this.verificarVictoria();
            // Aquí se debe actualizar la UI para mostrar que la celda está revelada
            const minasAlrededor: number = this.contarMinasAlrededor(fila, columna);
            document.getElementById(`celda-${fila}-${columna}`).firstChild.src = `img/open${minasAlrededor}.gif`; // Reemplaza esto con la ruta a la imagen que quieras usar
            
        }
    }

    private contarMinasAlrededor(i: number, j:number): number {
        let conteoMinas = 0;
        const direcciones = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
    
        for (let k = 0; k < direcciones.length; k++) {
            const dx = direcciones[k][0];
            const dy = direcciones[k][1];
            const nuevaI = i + dx, nuevaJ = j + dy;
    
            if (nuevaI >= 0 && nuevaI < this.tablero.filas && nuevaJ >= 0 && nuevaJ < this.tablero.columnas) {
                if (this.tablero.celdas[nuevaI][nuevaJ].esMina ) { // Asume que -1 representa una mina
                    conteoMinas++;
                }
            }
        }
    
        return conteoMinas;
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

