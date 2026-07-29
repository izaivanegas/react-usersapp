

export const UserRow = ({id, username, email}) =>{

    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{username}</td>
                <td>{email}</td>
                <td>
                    <button type="button" className="btn btn-warning"

                            onClick={()=> handleUpdate()}
                    >Update</button>
                </td>
                <td>
                    <button className="btn btn-warning"

                            onClick={()=>handleDelete()}
                    >Delete</button>
                </td>
            </tr>
        </>
    );
}