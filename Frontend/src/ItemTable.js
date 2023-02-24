function TableHeader()  {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Tag</th>
        <th>Id</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.itemData.map((row, index) => {
    return (
      <tr key={index}>
      <td>{row.name}</td>
      <td>{row.tag}</td>
      <td>{row._id}</td>
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