import React from 'react';
import './square.css';
import SquareContext from '../../contexts/square-context';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        //console.log(this.props.value)
        //console.log(this.props.squareObj);
        const value = this.props.value;
        const style = this.props.isSelected ? {
            'backgroundColor': 'green'
        } : null;
        let mark = '';
        if (value === 1) {
            mark = 'X';
        } else if (value === 2) {
            mark = 'O';
        }

        return (
            <SquareContext.Consumer>
                {context =>
                    <button
                        
                        className="square"
                        style={style}
                        onClick={() => context.onSquareClick(this.props.squareObj)}
                    >
                        {mark}
                    </button>
                }
            </SquareContext.Consumer>
        );
    }
}
export default Square;