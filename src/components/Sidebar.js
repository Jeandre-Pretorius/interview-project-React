import React from 'react';
import Card from './Card';
import Table from '@mui/joy/Table';

const Sidebar = ({ isOpen, data }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="sidebar">
            <h1 className="title">CubeZoo</h1>
            <h2 className="subtitle">Interview</h2>

            <div className="cards">
                <Card title="Test" content="Yeah yeah yeah"></Card>
                <Card title="Test 2" content="Yamate Kudasai"></Card>
            </div>
        </div>
    );
};

export default Sidebar;