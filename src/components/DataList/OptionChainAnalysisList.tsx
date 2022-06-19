import OisDataFetch from "../../api/OisDataFetch";
import ApiDataView from "./ApiDataView";
import React from "react";
import PaginateData from "./PaginateData";

type ApiDataType = {
  title: string;
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<any>;
};


const OptionChainAnalysisList = () => {

  const [pageNumber, setPageNumber] = React.useState(1);
  const [Data, setData] = React.useState<ApiDataType>({
    title: "",
    count: 0,
    next: null,
    previous: null,
    results: [],
  });



  const getData = (pageNumber: number | null) => {
    const osidata = new OisDataFetch();
    if (pageNumber === null) {
      return {};
    } else {
      osidata.optionChainAnalysis(pageNumber).then((response) => {
        // Add title into response data
        // response.data.title = "Option Chain Analysis";
        response.title = "Option Chain Analysis";
        setData(response);
      });
    }
  };

  const paginate = (apiData: ApiDataType) =>{
    if(apiData.next){
      setPageNumber(pageNumber + 1);
    }else if(apiData.previous){
      setPageNumber(pageNumber - 1);
    }else{
      setPageNumber(1);
    }
  }

  React.useEffect(() => {
    getData(pageNumber);
  }, [pageNumber]);

  return (
    <>
      <ApiDataView {...Data}/>
      <PaginateData apiData={Data} paginate={paginate}/>
    </>
  );
};

export default OptionChainAnalysisList;
