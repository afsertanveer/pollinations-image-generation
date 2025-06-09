import { useEffect, useState } from "react";

export default function useAPI() {
  //   const [ imageData, setImageData ] = useState({
  //     prompt: "",
  //     model: "flux",
  //     seed: "",
  //     width: "",
  //     height: "",
  //     nologo: "",
  //     private: "",
  //     enhance: "",
  //     safe: "",
  //     transparent: "",
  //     referrer: ""
  // })
  // const [ loading, setLoading] = useState({
  //     state: false,
  //     message: "",
  // })

  // const [ error, setError ] = useState(null);

  // const fetchImageData = async (prompt) => {
  //   try {
  //     setLoading({
  //       ...loading,
  //       state: true,
  //       message: "Fetching Image..."
  //     })

  //     // const response = await fetch(`https://image.pollinations.ai/prompt/{ytour_keyword}`)
  //     // import.meta.env.VITE_WEATHER_API_KEY
  //     // }&units=metric

  //     if (!response.ok) {
  //       const errorMessage = `Fetching Image failed: ${response.status}`;
  //       throw new Error(errorMessage);
  //     }

  //     const data = await response.json();

  //     const updateImageData = {
  //       ...imageData,
  //     }

  //   } catch (err) {
  //       setError(err);
  //   } finally {
  //     setLoading({
  //       ...loading,
  //       state: true,
  //       message: "Fetching Image..."
  //     })
  //   }
  // }

  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [model, setModel] = useState("");
  const [availableModels, setAvailableModels] = useState([]);
  const [height, setHeight] = useState(1024);
  const [width, setWidth] = useState(1024);
  const [seed, setSeed] = useState("");

  useEffect(() => {
    // Load available models
    async function fetchModels() {
      try {
        const res = await fetch('https://image.pollinations.ai/models');
        const data = await res.json();
        setAvailableModels(data.models);
        setModel(data.models[0]); // default first model
      } catch (err) {
        console.error('Error fetching models', err);
      }
    }
    fetchModels();
  }, []);

  const generateImages = async () => {
    setIsLoading(true);
    setError('');
    setImages([]);
    const randomSeed = Math.floor(Math.random() * 1000000000);
    setSeed(randomSeed);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const res = await fetch(
        `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=${model}&width=${width}&height=${height}&seed=${randomSeed}`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error('Failed to generate images');

      const imgUrls = [];
      // Simulating 9 image URLs since Pollinations AI returns 1 image per request, you can customize this loop
      for (let i = 0; i < 9; i++) {
        imgUrls.push(
          `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=${model}&width=${width}&height=${height}&seed=${randomSeed + i}`
        );
      }
      setImages(imgUrls);
    } catch (err) {
      setError('Unable to load images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return <></>;
}
