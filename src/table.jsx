import React from 'react';

class DynamicTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: props.message,
            items: []
        }
    }

    updateMessage(event) {
        this.setState({
            message: event.target.value
        })
    }

    renderRows() {
        var context = this;

        return this.state.items.map(function (o, i) {
            return (
                <tr key={"item-" + i}>
                    <td>
                        <input
                            type="text"
                            value={o}
                        />
                    </td>
                </tr>
            );
        });
    }


    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DynamicTable