import React from "react";
import Entrada from "../Components/Entrada/Entrada";
import Popular from "../Components/Popular/Popular";
import Ofertas from "../Components/Ofertas/Ofertas"
import Novedades from "../Components/Novedades/Novedades";
import Boletin from "../Components/Boletin/Boletin";
const Shop = () => {
    return(
        <div>
            <Entrada/>
            <Popular/>
            <Ofertas/>
            <Novedades/>
            <Boletin/>
        </div>
    )
}

export default Shop