import MyApp from "./MyApp"
// firstname -> value
async function makeTextEntry() {
  console.log("inside makeTextEntry")
  return (<form><br>
  Value to look for: <input type="text" id="value"/><br></br>
  <input type="submit" value="Submit" onclick="formdata()"/></br>
  </form>);
}

function FilterButtons(props, category, value)
{
  return (
    <tr>
    <td>
      <button onClick={() => makeTextEntry()}>Filter by Quantity</button>
      &nbsp;&nbsp;&nbsp;
      <button onClick={() => makeTextEntry()}>Filter by Tags</button>
    </td>
  </tr>
  );
}

function TableHeader()  {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Quantity</th>
        <th>Tag</th>
        <th>Id</th>
        <th>Username</th>
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
    <>
    <table> <FilterButtons/> </table>

    <table>
      <TableHeader />
      <TableBody itemData={props.itemData} removeItem = {props.removeitem} />
    </table>
    </>
  );
}

export default ItemTable;