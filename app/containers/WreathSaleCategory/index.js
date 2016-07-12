/**
 * Created by Duncan on 7/11/2016.
 */

import React from 'react';
import styles from './styles.css';

export class WreathSaleCategory extends React.Component {
    render() {
        return (
            <div>
                <table>
                    {this.props.scout.sales.map(function (item) {return <tr><td>{item.type}</td><td>{item.num}</td></tr>})}
                </table>
            </div>
        )
    }
}

function loop (item) {
    return (<tr><td>{item.type}</td><td>{item.num}</td></tr>)
}