import { useParams } from "react-router-dom";

export default function AllPosts() {
  const { pageNumber } = useParams();
  return <h2>All Posts; Page: {pageNumber}</h2>;
}
