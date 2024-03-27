import React from 'react';

const Sidebar = ({ isOpen }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="sidebar">
            <h1 className="title">Title</h1>
            <h2 className="subtitle">Subtitle</h2>
            <div className="cards">
                <div className="card">
                    <h3>Card 1</h3>
                    <p>Card content goes here.</p>
                </div>
                <div className="card">
                    <h3>Card 2</h3>
                    <p>Card content goes here.</p>
                </div>
                {/* Add more cards as needed */}
            </div>
        </div>
    );
};

export default Sidebar;