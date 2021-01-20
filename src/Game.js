import React, { useEffect, useState } from 'react'
import X from './X.gif';
import O from './O.gif';
import './App.css';

export const Game = () => {

    const initialState = new Array (9).fill(null);

    const stateInitial = new Array (9).fill(false);
    
    const inicioDisabled = new Array (9).fill(true);

    const [casillas, setCasillas] = useState(initialState);

    const [ fondo, setFondo ] = useState(initialState);

    const [ disablet, setDisablet ] = useState(inicioDisabled);

    const [ jugador, setJugador ] = useState("X");

    const [ next, setNext ] = useState(false);

    const [ estado, setEstado ] = useState(false);

    const [ imagen, setImagen ] = useState(stateInitial);

    const [ win, setWin ] = useState(null);

    const [ estadisticas, setEstadisticas ] = useState(false);

    const [marcador, setMarcador] = useState({
        jugadorX:0,
        jugadorO:0,
        empatados:0
    })

    const {jugadorX, jugadorO, empatados} = marcador;


    const [start, setStart] = useState({
        inicio:false,
        jugadores:false
    });

    const {inicio, jugadores} = start;

    const posibilidades = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]


    useEffect(() => {

        const itera = (arr) => {
            const [a,b,c] = arr;
            if (casillas[a] === "X" && casillas[b] === "X" && casillas[c] === "X"){
                setWin(casillas[c]);
                setStart({
                    ...start,
                    jugadores:false
                });
                setDisablet(inicioDisabled);
                return [a,b,c];
            }else if (casillas[a] === "O" && casillas[b] === "O" && casillas[c] === "O") {
                setWin(casillas[c]);
                setStart({
                    ...start,
                    jugadores:false
                });
                setDisablet(inicioDisabled);
                return [a,b,c];
            }
            
        }

        const ganadores = posibilidades.map(itera);

        const [gan] = ganadores.filter(gain => gain !== undefined)

        const empate = casillas.every(val => val !== null );
        if(empate && !gan) {
            setEstado(true);
            setStart({
                ...start,
                jugadores:false
            });
            setMarcador({
                ...marcador,
                empatados: empatados +1
            })
            setDisablet(inicioDisabled);
        }

        if( gan ) {
            const estilos = initialState;
            const [x,y,z] = gan;
            estilos.splice(x,1,true);
            estilos.splice(y,1,true);
            estilos.splice(z,1,true);
            setFondo(estilos);
        }
        
        // eslint-disable-next-line
    }, [casillas])

    useEffect(() => {
     if(win === "X"){
         setMarcador({
             ...marcador,
             jugadorX: jugadorX +1
         })
     }else if(win === "O"){
        setMarcador({
            ...marcador,
            jugadorO: jugadorO +1
        })
    }
    // eslint-disable-next-line
    }, [win])

    

    const handleClick = i => {

        let copiaImages = [...imagen]
        setImagen(copiaImages.fill(true,i,i+1));

        setNext(true);

        const valorX = casillas.filter(sig => sig === "X").length;
        const valorO = casillas.filter(sig => sig === "O").length;
        
        const signo = valorX === valorO ? "X" : "O";

        let nextJugador = signo === "X" ? "O" : "X";
        setJugador(nextJugador);

        const copiaCasillas = [...casillas];
        
        setCasillas(copiaCasillas.fill( signo, i, i+1 ));

        const deshabilit = [...disablet];

        setDisablet(deshabilit.fill(true, i, i+1 ));

    }

    const handleStartRstart = () => {
        if(!inicio){
            setStart({
                inicio:true,
                jugadores:true
            });
            setDisablet(initialState);
            setEstadisticas(true);
        }else{
            setStart({
              ...start,
                jugadores:true
            })
            setCasillas(initialState);
            setDisablet(initialState);
            setImagen(stateInitial);
            setWin(false);
            setNext(false);
            setJugador("X");
            setEstado(false);
            setFondo(initialState);
        }
    }

    const handleRstartAll = () => {
        setEstadisticas(false);
        setStart({
                inicio:false,
                jugadores:false,
        });
        setMarcador({
            jugadorX:0,
            jugadorO:0,
            empatados:0
        });
        setCasillas(initialState);
        setDisablet(inicioDisabled);
        setImagen(stateInitial);
        setWin(false);
        setNext(false);
        setJugador("X");
        setEstado(false);
        setFondo(initialState);
    }

    return (
        <>
           
            <div className="row-main">
                
                <div className="row-second">
                <h1 id="title" >jUeGa tic-tac-toe!</h1>
                    <div>
                        {win ?<h1>Gana {win}</h1>:null}
                        {estado ?<h1>Nadie Gana</h1>:null}
                        {jugadores ?<p>{next ? "Siguiente": "Inicia"} Jugador: {jugador}</p>:null}
                    </div>
                    <div className="row-wrap">
                        <button
                            style={fondo[0] ? {background:"#d9dab0"}:null}
                            onClick={()=>handleClick(0)}
                            disabled={disablet[0] ? true : null }
                        >{imagen[0] ? <img src={(casillas[0]==="X")?X:null||(casillas[0]==="O")?O:null} alt="img"/> : null}</button>
                        <button
                            style={fondo[1] ? {background:"#d9dab0"}:null} 
                            onClick={()=>handleClick(1)} 
                            disabled={disablet[1] ? true : null }
                        >{imagen[1] ? <img src={(casillas[1]==="X")?X:null||(casillas[1]==="O")?O:null} alt="img"/> : null}</button>
                        <button
                            style={fondo[2] ? {background:"#d9dab0"}:null} 
                            onClick={()=>handleClick(2)} 
                            disabled={disablet[2] ? true : null }
                        >{imagen[2] ? <img src={(casillas[2]==="X")?X:null||(casillas[2]==="O")?O:null} alt="img"/> : null}</button>
                    </div>
                    <div className="row-wrap">
                        <button
                            style={fondo[3] ? {background:"#d9dab0"}:null} 
                            onClick={()=>handleClick(3)} 
                            disabled={disablet[3] ? true : null }
                        >{imagen[3] ? <img src={(casillas[3]==="X")?X:null||(casillas[3]==="O")?O:null} alt="img"/> : null}</button>
                        <button
                            style={fondo[4] ? {background:"#d9dab0"}:null} 
                            onClick={()=>handleClick(4)} 
                            disabled={disablet[4] ? true : null }
                        >{imagen[4] ? <img src={(casillas[4]==="X")?X:null||(casillas[4]==="O")?O:null} alt="img"/> : null}</button>
                        <button
                            style={fondo[5] ? {background:"#d9dab0"}:null} 
                            onClick={()=>handleClick(5)} 
                            disabled={disablet[5] ? true : null }
                        >{imagen[5] ? <img src={(casillas[5]==="X")?X:null||(casillas[5]==="O")?O:null} alt="img"/> : null}</button>
                    </div>
                    <div className="row-wrap">
                        <button
                            style={fondo[6] ? {background:"#d9dab0"}:null} 
                            onClick={()=>handleClick(6)} 
                            disabled={disablet[6] ? true : null }
                        >{imagen[6] ? <img src={(casillas[6]==="X")?X:null||(casillas[6]==="O")?O:null} alt="img"/> : null}</button>
                        <button
                            style={fondo[7] ? {background:"#d9dab0"}:null} 
                            onClick={()=>handleClick(7)} 
                            disabled={disablet[7] ? true : null }
                        >{imagen[7] ? <img src={(casillas[7]==="X")?X:null||(casillas[7]==="O")?O:null} alt="img"/> : null}</button>
                        <button
                            style={fondo[8] ? {background:"#d9dab0"}:null} 
                            onClick={()=>handleClick(8)} 
                            disabled={disablet[8] ? true : null }
                        >{imagen[8] ? <img src={(casillas[8]==="X")?X:null||(casillas[8]==="O")?O:null} alt="img"/> : null}</button>
                    </div>
                    <div>
                        <button className="start-game" onClick={handleStartRstart}>{inicio ? "Nueva" : "Iniciar"} Partida</button>
                    </div>
                    {estadisticas
                        ?
                        <div>
                            <h3>Marcador:</h3>
                            <p className="parrafo" >Partidas Ganadas "X": {jugadorX}</p>
                            <p className="parrafo">Partidas Ganadas "O": {jugadorO}</p>
                            <p className="parrafo">Partidas Empatadas: {empatados}</p>
                            <button className="start-game" onClick={handleRstartAll}>Resetear Todo</button>
                        </div>
                        :null
                    }
                </div>
                
            </div>
        </>
    )
}
