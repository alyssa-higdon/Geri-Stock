import React from 'react';

function ReadOnlyRow(props){
    return(
        <tr key={props.index}>
            <td>{props.row.name}</td>
            <td>{props.row.quantity}</td>
            <td>{props.row.tag}</td>
            <td>{props.row._id}</td>
            <td>{props.row.username}</td>
            <td>
                <button type="button" onClick={(event) => props.handleChange(event, props.row)}>Edit</button>
            </td>
            <td>
                <button onClick={() => props.delete(props.index)}>Delete</button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow;