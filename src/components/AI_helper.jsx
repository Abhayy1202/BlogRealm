import React, { useState } from "react";
import Button from "./Button";
import helper from "../main.js";

function AI_helper({ handleApply, Ai, setAi }) {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = async () => {
    try {
      const result = await helper({ inputs: prompt });
      const ans = result[0].generated_text.replace(/\n/g, "\n\n");
      //   console.log("LLM - ", ans);
      setPrompt(ans);
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return (
    <>
      {Ai && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-xl mx-auto px-4 max-w-md shadow-lg overflow-hidden ">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-white p-6 border-b border-neutral-200 dark:border-neutral-700">
                Generate Content
              </h2>
              <button
                className="p-5 dark:text-white"
                onClick={() => setAi(!Ai)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-x"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* <!-- Prompt Input --> */}
              <div className="">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Enter your prompt
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows="4"
                  placeholder="Describe what you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                ></textarea>
              </div>

              {/* <!-- Generate Button --> */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <Button
                    type="submit"
                    className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    onClick={handleGenerate}
                  >
                    Generate
                  </Button>
                </div>
                <div className="w-1/2">
                  <Button
                    type="submit"
                    className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    onClick={() => handleApply(prompt, setPrompt)}
                  >
                    Apply in Editor
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AI_helper;
