import React from 'react'
import PropTypes from 'prop-types'
import { TextField, InputAdornment } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { useForm } from 'react-hook-form'

const SearchInput = ({ onSearch, placeholder }) => {
  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSearch)}>
      <TextField
        fullWidth
        autoComplete="search-input"
        name="search"
        placeholder={placeholder}
        margin="dense"
        variant="outlined"
        inputRef={register}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          )
        }}
      />
    </form>
  )
}

SearchInput.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string
}

SearchInput.defaultProps = {
  onSearch: (search) => console.log(search),
  placeholder: 'Buscar...'
}

export default SearchInput
