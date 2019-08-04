import React from "react";

export default class UndoList extends React.Component {

    render() {
        const { list, deleteItem } = this.props;
        return (
            <div>
                <div data-test="count">{list.length}</div>
                <ul>
                    {
                        list.map((item, index) => {
                            return (
                                <li data-test="listItem" key={`${item}-${index}`}>
                                    {item}
                                    <span data-test="deleteItem" onClick={() => {deleteItem(index)}}>-</span>
                                </li> 
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}