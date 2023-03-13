import React, {useState} from "react";

function ItemForm(props){
  const [item, setItem] = useState(
      {
          name: "",
          role: "",
      }
  );
    
  function handleChange(event) {
    //console.log(event.target);
    const { name, value } = event.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
    //console.log(item);
  }
    

  function submitForm() {
    props.handleSubmit(item);
    setItem({
      name: "",
      quantity: "",
      tag: "",
      notes: "",
      username: ""
    });
  }

  return (
      <form>
        <label htmlFor="name">Item Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={item.name}
          onChange={handleChange}
        />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="text"
          name="quantity"
          id="quantity"
          value={item.quantity}
          onChange={handleChange}
        />


        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          name="tag"
          id="tag"
          value={item.tag}
          onChange={handleChange}
        />
    
        <label htmlFor="notes">Notes</label>
        <input
          type="text"
          name="notes"
          id="notes"
          value={item.notes}
          onChange={handleChange}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={item.username}
          onChange={handleChange}
        />
    
        <input type="button" value="Submit" onClick={submitForm} />
      </form>
    ); 
}



export default ItemForm;