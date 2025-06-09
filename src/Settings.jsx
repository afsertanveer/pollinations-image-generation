import { useEffect, useState } from "react";

export default function Settings({
  width,
  height,
  setModelName,
  setWidth,
  setHeight,
}) {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchModels = async () => {
      try {
        const response = await fetch("https://image.pollinations.ai/models");
        if (!response) {
          console.error(
          "error with the url",
          
        );
        }
        const data = await response.json();
        setModels(data);
      } catch (error) {
        console.error(
          "error fetching the data",
          error
        );
        setModels([]);
      }
    };
    fetchModels();
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <h1 className="text-3xl text-center font-bold">IS LOADING.....</h1>
      ) : (
        <div className="border border-zinc-700/70 mb-6 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Advanced Settings</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Model Selection */}
            <div>
              <label
                htmlFor="model"
                className="block text-sm font-medium text-zinc-700 mb-1"
              >
                Model
              </label>
              <select
                id="model"
                className="w-full px-3 py-2 bg-zinc-900/10 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                onChange={(e) => setModelName(e.target.value)}
              >
                <option value={null}>---select a model---</option>
                {models.map((model) => (
                  <option className="bg-zinc-900" key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {/* Seed Input */}
            <div>
              <label
                htmlFor="seed"
                className="block text-sm font-medium text-zinc-700 mb-1"
              >
                Seed (for reproducible results)
              </label>
              <input
                type="number"
                id="seed"
                className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                disabled
              />
            </div>

            {/* Width Input */}
            <div>
              <label
                htmlFor="width"
                className="block text-sm font-medium text-zinc-700 mb-1"
              >
                Width
              </label>
              <input
                type="number"
                id="width"
                min="0"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value))}
                className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Height Input */}
            <div>
              <label
                htmlFor="height"
                className="block text-sm font-medium text-zinc-700 mb-1"
              >
                Height
              </label>
              <input
                type="number"
                id="height"
                min="0"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Aspect Ratio Presets */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Aspect Ratio Presets
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setHeight(1024);
                    setWidth(1024);
                  }}
                  className="bg-zinc-900/10 px-3 py-3 text-xs hover:bg-zinc-800 rounded transition-colors"
                >
                  1:1
                </button>
                <button
                  onClick={() => {
                    setWidth(1920);
                    setHeight(1080);
                  }}
                  className="bg-zinc-900/10 px-3 py-3 text-xs hover:bg-zinc-800 rounded transition-colors"
                >
                  16:9
                </button>
                <button
                  onClick={() => {
                    setWidth(1024);
                    setHeight(768);
                  }}
                  className="bg-zinc-900/10 px-3 py-3 text-xs hover:bg-zinc-800 rounded transition-colors"
                >
                  4:3
                </button>
                <button onClick={() => {
                    setWidth(1200);
                    setHeight(800);
                  }} className="bg-zinc-900/10 px-3 py-3 text-xs hover:bg-zinc-800 rounded transition-colors">
                  3:2
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
