import React from 'react';
import { Typography, Box } from '@material-ui/core';
import styled from '@emotion/styled'

import { css } from '@emotion/core'
import ChartGraphic from './chartsGraphic';
import TableGeneric from './table';


const ImageContainer = styled.div`
  padding: 16px;
  grid-template-columns: 0px auto;
  align-items: center;
  img {
    max-width: 100%;
  }
  .image {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .img {
    transition: width 0.5s ease, height 0.5s ease;
  }

`
const SectionGeneric = ({ type, value, id }) => {
    const getField = () => {
        switch (type) {
            case 'title':
                return <Typography align="center" style={{ fontWeight: 700, paddingBottom: '1rem' }} variant="h3" color="primary">{value}</Typography>
            case 'subtitle':
                return <Typography style={{ fontWeight: 700, paddingBottom: '1rem', paddingTop: '1rem' }} variant="h5" align="center" color="textPrimary">{value}</Typography>
            case 'paragraph':
                return <Typography component="p" style={{ paddingBottom: '1rem' }} align="justify" color="textSecondary">{value}</Typography>
            case 'chart':
                return (
                    <ChartGraphic value={value} id={id} />
                )
            case 'image':
                return (
                    <ImageContainer>
                        <div className="image">
                            <img src={value.url} alt="img" />
                        </div>
                    </ImageContainer>
                )
            case 'list':
                return (
                    <ul>
                        {value.map((item, key) => (
                            <li key={key}>
                                <Typography style={{ paddingBottom: '0.5rem' }} component="li" color="textSecondary" align="justify">{item}</Typography>
                            </li>
                        ))}
                    </ul>
                )
            case 'table':
                return (
                    <TableGeneric data={value} />
                )
            default:
                return null;
        }
    }


    return (
        <Box css={css`
            width: 100%;
            min-width: 96%;
        `}

        >
            <div css={css`
                width: 80%;
                margin: 0 auto;
                background-color: 'blue';
            `}>
                {getField()}
            </div>
        </Box>

    );
}

export default SectionGeneric;