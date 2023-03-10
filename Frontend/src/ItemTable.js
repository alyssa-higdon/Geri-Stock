function TableHeader()  {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Quantity</th>
        <th>Tag</th>
        <th>Id</th>
        <th>Username</th>
        <th>Minimum Quantity</th>
        <th>Maximum Quantity</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.itemData.map((row, index) => {
    return (
      <tr key={index}>
      <td>{row.name}</td>
      <td>{row.quantity}</td>
      <td>{row.tag}</td>
      <td>{row._id}</td>
      <td>{row.username}</td>
      <td>{row.minquantity}</td>
      <td>{row.maxquantity}</td>
      <td>
        <button onClick={() => props.removeItem(index)}>Delete</button>
      </td>
    </tr>
    );
   }
  );
  return (
      <tbody>
        {rows}
       </tbody>
   );
}
  
function ItemTable(props) {
  return (
    <table>
      <TableHeader />
      <TableBody itemData={props.itemData} removeItem = {props.removeitem} />
    </table>
  );
}

export default ItemTable;