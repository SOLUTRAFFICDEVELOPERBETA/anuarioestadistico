import React from 'react';
import ImagBackground from '../components/imgBackground';
import Loading from '../components/Spinner';
import usePages from '../hooks/usePages';
import { MenuTabsMain } from '../components/menuDropdown';
import { LinksMenu } from '../constants';

const Home = () => {
    const data = usePages('Inicio');

    if (!data) return <Loading />;
    const { fields } = data[0];
    return (
        <div>
            <ImagBackground imgSrc={fields[0].value.url} title="Anuario Estadístico 2020" />
            <div>
                <div>
                    <MenuTabsMain data={LinksMenu} />
                </div>
            </div>
        </div>
    );
};

export default Home;
