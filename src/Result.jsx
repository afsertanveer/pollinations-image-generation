export default function Result({downloadedImages,setDownloadedImages, imageLinks, errors }) {
  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    const prevData = downloadedImages;
    if(prevData.filter((data)=>data===url).length===0){
      prevData.push(url);
      setDownloadedImages(prevData);
    }
  };

  return (
    <>
      <div>
        <h3 className="text-zinc-200 mb-4 font-bold text-lg">Result</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {imageLinks &&
            imageLinks.map((url, index) => (
              <div
                key={index}
                className="image-card rounded-xl overflow-hidden cursor-pointer relative border border-zinc-700"
              >
                {errors[index] ? (
                  <div className="w-full h-48 flex items-center justify-center text-red-500 bg-zinc-900">
                    {errors[index]}
                  </div>
                ) : (
                  <>
                    <img
                      src={url}
                      alt="Generated Result"
                      className="w-full h-48 object-cover"
                    />

                    <div
                      className="absolute bottom-2 right-2 p-1 bg-black/50 rounded"
                      onClick={() => handleDownload(url)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-download text-white"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
