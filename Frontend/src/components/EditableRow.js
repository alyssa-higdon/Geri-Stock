import React from 'react';

const EditableRow = ({ props, row, index }) => {
    return(
        <div>
            <tr key={index}>
                <td>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={row.name}
                    ></input>
                </td>
                <td>
                    <input 
                        type="text"
                        name="quantity"
                        id="quantity"
                        value={row.quantity}
                    ></input>
                </td>
                <td>
                    <input
                        type="text"
                        name="tags"
                        id="tags"
                        value={row.tags}
                    ></input>
                </td>
                <td>
                    <input
                        type="text"
                        name="notes"
                        id="notes"
                        value={row.notes}
                    ></input>
                </td>
                <td>{row._id}</td>
                <td>
                    <input>{row.username}</input>
                </td>
                <td>
                    <button onClick={() => props.editItem(index)}>Save</button>
                </td>
                <td>
                    <button onClick={() => props.removeItem(index)}>Delete</button>
                </td>
            </tr>
        </div>
    )
}

export default EditableRow;