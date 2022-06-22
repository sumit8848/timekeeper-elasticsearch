import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ result }: any) => {
  const { body, creator, startingPage, issue_url, subject, title } = result;

  const url = issue_url;
  const startingPageNumber = startingPage ? startingPage[0] : 0;
  const description =
    body?.p?.length > 0
      ? body?.p.join(" ").split(" ").slice(0, 100).join(" ") + "..."
      : "";

  return (
    <div className="p-3 shadow blue-hover mb-3">
      <Link
        to={`/pdf-viewer?pdfUrl=${url}&pageNumber=${startingPageNumber}`}
        target="_blank"
        className="link"
      >
        {/* <img
          src="./images/fallback.jpg"
          alt="Magazine"
          className="d-block w-full magazine-image"
        /> */}

        <div className="px-1 py-2 ">
          <p className=" small text-uppercase text-muted bottom-border">
            {subject?.join(", ")}
          </p>
          <h1 className="font-weight-normal">
            {title?.join(", ")}
          </h1>
          <p className="text-monospace ">{description}</p>
        </div>
        <div className="w-full bg-white py-1 px-2 clearfix upper-border ">
          <span className="float-right">
            <span className="styled-link">{creator?.join(", ")}</span>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
