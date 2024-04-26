import React from "react";
import { Button } from "@nextui-org/react";

const HeroSection = ({
  backgroundImage,
  mainText,
  highlightColor = "text-red-400", // Default color for highlighted text
  link1Href,
  link1Text,
  link2Href,
  link2Text,
  button1Color = "bg-green-950", // Default button color for the first button
  button2Color = "bg-green-950", // Default button color for the second button
}) => {
  return (
    <div>
      <div
        className="relative h-[90vh] xl:min-h-screen flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="z-10 p-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
            {mainText} <span className={highlightColor}> Something?</span>
          </h1>
        </div>

        <div className="z-10 flex flex-wrap justify-center gap-4">
          <Button
            onPress={() => {
              window.location.href = link1Href;
            }}
            size="md"
            className={`${button1Color} text-white`}
          >
            {link1Text}
          </Button>

          <Button
            onPress={() => {
              window.location.href = link2Href;
            }}
            size="md"
            className={`${button2Color} text-white`}
          >
            {link2Text}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
