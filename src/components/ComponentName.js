import React from 'react';
import { serviceFunction } from '../services/ServiceName';

class ComponentName extends React.Component {
    render() {
        const result = serviceFunction('input');
        return (
            <div>
                {result}
            </div>
        );
    }
}

export default ComponentName;
