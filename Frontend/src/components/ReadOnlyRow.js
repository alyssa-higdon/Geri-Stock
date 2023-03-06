import React from 'react';

const ReadOnlyRow = ({ props, row, index }) => {
    return(
        <div>
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.quantity}</td>
                <td>{row.tag}</td>
                <td>{row._id}</td>
                <td>{row.username}</td>
                <td>
                    <button onClick={() => props.editItem(index)}>Edit</button>
                </td>
                <td>
                    <button onClick={() => props.removeItem(index)}>Delete</button>
                </td>
            </tr>
        </div>
    )
}

export default ReadOnlyRow;