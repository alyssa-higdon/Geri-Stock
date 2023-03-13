import React, {useState} from "react";

function ItemForm(props){
    const [item, setItem] = useState(
        {
            name: "",
            quantity: "",
            tag: "",
            notes: "",
            minquantity: "",
            maxquantity: "",
            
        }
    );
    
    function handleChange(event) {
        const { name, value } = event.target;
        setItem((prevItem) => ({
          ...prevItem,
          [name]: value,
        }));
      }
      

      function submitForm() {
        props.handleSubmit(item);
        setItem({
          name: "",
          quantity: "",
          tag: "",
          notes: "",
          minquantity: "",
          maxquantity: "",
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
         <label htmlFor="name">Quantity</label>
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

          <label htmlFor="minquantity">Miminum Desired Quantity</label>
          <input
            type="text"
            name="minquantity"
            id="minquantity"
            value={item.minquantity}
            onChange={handleChange}
          />

          <label htmlFor="maxquantity">Maximuminum Desired Quantity</label>
          <input
            type="text"
            name="maxquantity"
            id="maxquantity"
            value={item.maxquantity}
            onChange={handleChange}
          />

          <input type="button" value="Submit" onClick={submitForm} />
        </form>
      );
      
}



export default ItemForm;