function TableHeader()  {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Role</th>
        <th>Id</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
      <td>{row.name}</td>
      <td>{row.username}</td>
      <td>{row.role}</td>
      <td>{row._id}</td>
      <td>
        <button onClick={() => props.removeCharacter(index)}>Delete</button>
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

function UserTable(props) {
    return (
      <table>
        <TableHeader />
        <TableBody characterData={props.characterData} removeCharacter = {props.removeCharacter} />
      </table>
    );
}

export default UserTable;