import React from 'react';
import PropTypes from 'prop-types'
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
    font-size:2rem;
    line-height: 1px;

    @media(max-Width: 768px){
    top: 50%;
    left: 30%;
    
    }

}

.r {
    position: absolute;
    top: 50%;
    left: 10%;
    background-color: red;
    height: 2px;
    width: 14rem;
    
    @media(max-width: 768px){
    top: 60%;
    left: 30%;
    width: 12rem;
    }

}

.subTitile {
    position: absolute;
    top: 45%;
    left: 10%;
    color: #fff;
    font-size: 1.5rem;

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
const ImagBackground = ({ imgSrc, title, subTitle }) => {
    return (
        <ContainerImagen>
            <img src={imgSrc} alt="" />
            <h1 className="titulo">{title}</h1>
            <div className="r" />
            <p className="subTitile">{subTitle}</p>
        </ContainerImagen>
    );
}
ImagBackground.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string,
    subTitle: PropTypes.string

}
ImagBackground.defaultProps = {
    imgSrc: '/static/img/fondo2.jpg',
    title: 'Anuario 2020',
    subTitle: 'Región ordenada, conectada y sostenible'
}

export default ImagBackground;