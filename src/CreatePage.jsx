import React, { useState } from "react";
import Search from "./Search";
import Settings from "./Settings";
import Result from "./Result";

const CreatePage = ({ downloadedImages, setDownloadedImages,imageLinks,setImageLinks }) => {
  const [keyword, setKeyword] = useState("");
  const [modelName, setModelName] = useState("");
  const [height, setHeight] = useState(512);
  const [width, setWidth] = useState(512);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Helper function: Fetch with timeout
  const fetchWithTimeout = (url, timeout = 15000) => {
    return Promise.race([
      fetch(url).then((res) => {
        if (!res.ok) throw new Error("Image fetch failed");
        return res.blob();
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), timeout)
      ),
    ]);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(modelName)
    if(keyword===null || keyword===""){
        alert("please write in the searchbox");
        setIsLoading(false);
        return ;
    }

    const imageUrls = [];
    const errorsArray = [];

    for (let i = 0; i < 2; i++) {
      try {
        const seed = Math.floor(Math.random() * 1000000000);
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(
          keyword
        )}?model=${modelName}&width=${width}&height=${height}&seed=${seed}`;

        console.log("Fetching:", url);

        const blob = await fetchWithTimeout(url, 15000); // 15s timeout
        const imageUrl = URL.createObjectURL(blob);

        console.log("Image URL:", imageUrl);
        imageUrls.push(imageUrl);
        errorsArray.push(null); // No error for this image
      } catch (error) {
        console.log("Error fetching image:", error);

        imageUrls.push(""); // Push empty string
        errorsArray.push("Unable to Load"); // Mark error
      }
    }

    setImageLinks(imageUrls);
    setErrors(errorsArray);
    setIsLoading(false);
  };

  return (
    <>
      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-8">
          Let's create a masterpiece, Alvian!{" "}
          <span className="text-2xl">👋</span>
        </h2>

        <Search handleSubmit={handleSubmit} setKeyword={setKeyword} />
        <Settings
          width={width}
          height={height}
          setModelName={setModelName}
          setHeight={setHeight}
          setWidth={setWidth}
        />

        {/* Result Section */}
        {isLoading ? (
          <h1 className="text-3xl text-center font-bold">
            Generating Image. Please Wait!
          </h1>
        ) : (
          <Result downloadedImages={downloadedImages} setDownloadedImages={setDownloadedImages} imageLinks={imageLinks} errors={errors} />
        )}
      </div>
    </>
  );
};

export default CreatePage;
