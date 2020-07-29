import React from 'react';
import styled from '@emotion/styled'

const ContainerImagen = styled.div`
background-repeat: no-repeat;
background-size: cover;
position: relative;
display: inline-block;
text-align: center;


.titulo {
    position: absolute;
    top: 40%;
    left: 10%;
    color: #fff;
    font-size:4rem;
    line-height: 1px;

    @media(max-Width: 768px){
    top: 50%;
    left: 30%;
    
    }

}

.r {
    position: absolute;
    top: 45%;
    left: 10%;
    background-color: red;
    height: 2px;
    width: 25rem;
    
    @media(max-width: 768px){
    top: 55%;
    left: 30%;
    }

}

.subTitile {
    position: absolute;
    top: 40%;
    left: 10%;
    color: #fff;
    font-size: 3rem;

    @media(max-width: 768px){
    top: 50%;
    left: 10%;
    }
}
    img{
        height: 400px;
        width: 100%;

    }

`
const imgSrc = '/static/img/fondo2.jpg'
const ImagBackground = () => {
    return (
        <ContainerImagen>
            <img src={imgSrc} alt="" />
            <h1 className="titulo">Anuario 2020</h1>
            <div className="r" />
            <p className="subTitile">Región ordenada, conectada y sostenible</p>
        </ContainerImagen>
    );
}

export default ImagBackground;