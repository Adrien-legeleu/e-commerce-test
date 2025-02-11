import React from "react";
interface Params {
  id: string;
}

export default function page({ params }: { params: Params }) {
  return <div>ID : {params.id}</div>;
}
