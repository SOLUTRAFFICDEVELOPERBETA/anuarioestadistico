import React from 'react';
import PropTypes from 'prop-types'
import { Box, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import styled from '@emotion/styled'

const ContainersFilters = styled.div`
   .selectEmpty {
       margin-top: 2rem;
   }
   .formControl {
        margin: 1rem;
        min-width: 200px;
   }

`
const ayers = ['2014', '2015', '2016', '2017', '2018', '2019']
const Filters = ({ options, onChange, label, placeholder }) => {
    const [data, setData] = React.useState(options)
    const [ayer, setAyer] = React.useState('')

    const handleChange = (event) => {
        setAyer(event.target.value);
    };
    return (
        <ContainersFilters component="div">
            <FormControl className="formControl">
                <InputLabel id={`id_${label}`}>{label}</InputLabel>
                <Select
                    className="selectEmpty"
                    labelId={`id_${label}`}
                    id={`select_${label}`}
                    value={ayer}
                    onChange={handleChange}
                >
                    <MenuItem value="" disabled>
                        {placeholder}
                    </MenuItem>
                    {data.map(value => (
                        <MenuItem value={value}>{value}</MenuItem>
                    ))}
                </Select>
            </FormControl>

        </ContainersFilters>
    );
}

Filters.propTypes = {
    options: PropTypes.oneOf([PropTypes.array, PropTypes.object]),
    onchange: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string
}
export default Filters;