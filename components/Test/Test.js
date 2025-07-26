// app/test/page.jsx (or .tsx)


const Test = async () => {
    let data = [];
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
            next: { revalidate: 300 },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        data = await res.json();
    } catch (error) {
        console.log("internal server error: team", error.message);
        data = [];
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">User List</h2>
            {data.length === 0 ? (
                <p className="text-center">No users found or error fetching data.</p>
            ) : (
                <div className="row">
                    {data.map((user) => (
                        <div key={user.id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{user.username}</h6>
                                    <p className="card-text">
                                        <strong>Email:</strong> {user.email} <br />
                                        <strong>Phone:</strong> {user.phone} <br />
                                        <strong>Website:</strong>{" "}
                                        <a href={`http://${user.website}`} target="_blank" rel="noreferrer">
                                            {user.website}
                                        </a>
                                    </p>
                                </div>
                                <div className="card-footer text-muted">
                                    <small>{user.company?.name}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Test;
