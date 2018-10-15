import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Spinner extends React.Component {
    render() {
        return (
            <div className="text-center my-5">
                <FontAwesomeIcon icon={["fas", "spinner"]} spin size="3x"/>
            </div>
        );
    }
}