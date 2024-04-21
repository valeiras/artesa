"use client";

import { useParams } from "next/navigation";
import React from "react";

const SupplierDetailPage: React.FC = () => {
  const { id } = useParams();
  return <div>SupplierDetailPage</div>;
};

export default SupplierDetailPage;
