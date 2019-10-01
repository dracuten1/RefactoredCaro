import React from 'react';

const squareContext = React.createContext({
    onSquareClick: (square) => { },
    value: null
});

export default squareContext;