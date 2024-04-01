import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopulation } from '../redux/populationSlice';
import Card from './Card';
import Table from '@mui/joy/Table';

const Sidebar = ({ isOpen, data }) => {
    const dispatch = useDispatch();
    const totalPopulation = useSelector((state) => state.population.totalPopulation);
    const populationStatus = useSelector((state) => state.population.status);
    const error = useSelector((state) => state.population.error);

    useEffect(() => {
        if (populationStatus === 'idle') {
        dispatch(fetchPopulation());
        }else{
            console.log(totalPopulation);
        }
    }, [dispatch, populationStatus]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="sidebar">
            <h1 className="title">CubeZoo</h1>
            <h2 className="subtitle">Interview</h2>

            <div className="cards">
                <Card title="Population Total" content={populationStatus === 'succeeded' ? `Total Population: ${totalPopulation}` : 'Loading...'} />
                <Card title="Test 2" content="Yamate Kudasai"></Card>
            </div>
        </div>
    );
};

export default Sidebar;