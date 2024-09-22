import { useLoaderData } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { loader } from "./ProfileLoader";
import { Button } from "@/components/ui/button";
import { FaHistory } from "react-icons/fa";

const Profile = () => {
  const { user } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div className="flex flex-col items-center py-20 max-w-xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <AvatarImage src={user.avatar} alt={user.name} />
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <Card className="w-full bg-white shadow-lg rounded-lg p-4">
        <CardHeader>
          <h3 className="text-xl font-semibold text-gray-800">
            Account Information
          </h3>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Phone:</span>
            <span>{user.phone || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Address:</span>
            <span>{user.address || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Joined:</span>
            <span>{new Date(user.joinedAt).toLocaleDateString()}</span>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-100 transition duration-200"
          >
            <FaHistory className="w-5 h-5 mr-2" /> View Order History
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
