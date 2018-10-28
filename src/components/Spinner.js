import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

export default class Spinner extends React.Component {
    render() {
        return (
            <div className="text-center my-5">
                <FontAwesomeIcon icon={faSpinner} spin size="3x"/>
            </div>
        );
    }
}