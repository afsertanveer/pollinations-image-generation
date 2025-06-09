import Header from "./Header";
import { useEffect, useState } from "react";
import CreatePage from "./CreatePage";
import Downloaded from "./Downloaded";

export default function Page() {
  const [imageLinks, setImageLinks] = useState([]);
  const [route, setRoute] = useState("create");
  const [downloadedImages,setDownloadedImages] = useState([])


  return (
    <>
      <div className="bg-black text-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Header setRoute={setRoute} />
          {route === "create" && <CreatePage imageLinks={imageLinks} setImageLinks={setImageLinks} downloadedImages={downloadedImages} setDownloadedImages={setDownloadedImages} />}
          {route === "downloaded" && <Downloaded downloadedImages={downloadedImages} />}
        </div>
      </div>
    </>
  );
}
