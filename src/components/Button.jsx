import React from "react";

function Button ({onClick}) {
    return(
        <>
        <button onClick={onClick} className="u-full-width button-primary" >Agregar Evento</button>
        </>
    );
}
export default Button