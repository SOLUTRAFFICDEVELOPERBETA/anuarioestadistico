import React from 'react';
import PagesContext from '../contexts/pagess';

const usePages = (source) => {
    const { pages } = React.useContext(PagesContext)
    const [data, setData] = React.useState(null)

    React.useEffect(() => {
        if (pages) {
            setData(pages.filter(page => page.title === source))
        }
    }, [pages])

    const d =  data && data.map(page => ({
        fields: page.fields,
        title: page.title,
        id: page.id

    }))

    return d


}

export default usePages;