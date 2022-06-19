import React from "react";
import { Pagination } from "@mui/material";

type ApiDataType = {
  title: string;
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<any>;
};

type PaginateDataProps = {
  apiData: ApiDataType;
  paginate: (apiData: ApiDataType) => void;
};

export default function PaginateData(props: PaginateDataProps) {
  const page = process.env.REACT_APP_PAGE_SIZE;
  const pageSize = parseInt(page ? page : "8");
  const pageCount = Math.ceil(props.apiData.count / pageSize);

  const handleChange = (event: any) => {
    props.paginate(props.apiData);
  };

  return (
    <Pagination
      count={pageCount}
      color="secondary"
      onChange={handleChange}
      page={props.apiData.next ? pageSize : 1}
      sx={{
        marginLeft: 2,
        marginTop: 2,
      }}
    />
  );
}
