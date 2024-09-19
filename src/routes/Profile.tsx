interface UserProfile {
  name: string;
  email: string;
}

const Profile = () => {
  const user: UserProfile = {
    name: "Zacky Achmad",
    email: "zacky@example.com",
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-lg mx-auto">
      <img
        src="https://via.placeholder.com/150"
        alt={user.name}
        className="w-32 h-32 rounded-full border-4 border-gray-300 mb-4"
      />
      <h2 className="text-3xl font-bold text-center mb-2">{user.name}</h2>
      <p className="text-gray-500 text-center">{user.email}</p>
    </div>
  );
};

export default Profile;
