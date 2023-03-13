import React from 'react';

function EditableRow(props){
    function handleChange(event) {
        //console.log(event.target);
        const { name, value } = event.target;
        props.setNewItemData((prevItem) => ({
          ...prevItem,
          [name]: value,
        }));
        //console.log(props.index, props.newItemData);
    }

    return(
        <tr key={props.index}>
            <td>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={props.newItemData.name}
                    onChange={handleChange}
                ></input>
            </td>
            <td>
                <input 
                    type="text"
                    name="quantity"
                    id="quantity"
                    value={props.newItemData.quantity}
                    onChange={handleChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    name="tag"
                    id="tag"
                    value={props.newItemData.tag}
                    onChange={handleChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    name="notes"
                    id="notes"
                    value={props.newItemData.notes}
                    onChange={handleChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={props.newItemData.username}
                    onChange={handleChange}
                ></input>
            </td>
            <td>
                <button onClick={() => {props.edit(props.index, props.newItemData)}}>Save</button>
            </td>
        </tr>
    )
}

export default EditableRow;