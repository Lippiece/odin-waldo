import { useLoaderData, useRouteLoaderData } from "react-router-dom";

const Profile = () => {
  const data = useLoaderData();
  return (
    <div>
      <h1>Hello from Profile</h1>
      {data.map((user: any) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
