import { useParams } from "react-router-dom";

export default function User() {
  const params = useParams();
  return <h2>User ID: {params.userId}</h2>;
}