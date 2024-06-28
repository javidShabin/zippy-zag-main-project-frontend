import React from "react";
import { useParams } from "react-router-dom";

const RestDetails = () => {
  const { id } = useParams();
  console.log(id);
  return <div>this is restauuranr</div>;
};

export default RestDetails;
