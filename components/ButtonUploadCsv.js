import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'


const ButtonUploadCsv = ({ title, handleFilesAnnex, name, id, htmlFor }) => {
    return (
        <Box >
            <input
                type={'file'}
                name={name}
                id={id}
                multiple={false}
                style={{ display: 'none' }}
                onChange={(e) => handleFilesAnnex(e.target.files)}
            />
            <label htmlFor={htmlFor}>
                <Button
                    endIcon={<CloudUpload />}
                    component={'div'}
                    size={'small'}
                    fullWidth={true}
                    variant={'contained'}
                    color={'secondary'}
                >
                    {title}
                </Button>
            </label>
        </Box>
    )
}
ButtonUploadCsv.propTypes = {
    title: PropTypes.string,
    handleFilesAnnex: PropTypes.func

}
export default ButtonUploadCsv;