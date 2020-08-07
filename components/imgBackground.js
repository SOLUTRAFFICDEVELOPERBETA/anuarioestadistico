import React from 'react';
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Typography } from '@material-ui/core'

const ContainerImagen = styled.div`
background-repeat: no-repeat;
background-size: cover;
position: relative;
display: inline-block;
text-align: center;


@media(min-Width: 768px){
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
}
.titulo {
    position: absolute;
    top: 40%;
    left: 10%;
    color: #fff;
    font-size:3rem;
    line-height: 1px;

    @media(max-Width: 768px){
    top: 40%;
    left: 10%;
    display: flex;
    font-size:2rem;
    justify-content: center;
    }

}

.r {
    position: absolute;
    top: 45%;
    left: 10%;
    background-color: red;
    height: 2px;
    width: 34rem;
    
    @media(max-width: 768px){
    top: 45%;
    left: 10%;
    width: 22rem;
    }

}

.subTitile {
    position: absolute;
    top: 45%;
    left: 10%;
    color: #fff;
    font-size: 2rem;

    @media(max-width: 768px){
    top: 45%;
    left: 3%;
    font-size: 1.5rem;
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
            <Typography component="h1" align="center" variant="h1" className="titulo">{title}</Typography>
            <div className="r" />
            <Typography component="p" align="center" className="subTitile">{subTitle}</Typography>
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