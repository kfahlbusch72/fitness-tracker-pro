import { useParams, useNavigate } from "react-router-dom";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetails() {
  const { activityId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  const activity = activities?.find((a) => a.id === Number(activityId));

  const { mutate: deleteActivity, loading: deleting } = useMutation(
    "DELETE",
    `/activities/${activityId}`,
    ["activities"]
  );

  const handleDelete = async () => {
    await deleteActivity();
    navigate("/activities");
  };

  if (loading || !activity) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>{activity.name}</h2>
      <p>{activity.description}</p>
      <p>Created by: {activity.creatorName}</p>
      {token && (
        <button onClick={handleDelete}>
          {deleting ? "Deleting..." : "Delete"}
        </button>
      )}
    </div>
  );
}
