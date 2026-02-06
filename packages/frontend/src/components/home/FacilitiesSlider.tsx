// React
import { FC, useEffect, useRef, useState } from "react";
// Next
import Image from "next/image";
// Types
import SliderButtonsProps from "@/core/interfaces/component/SliderButtonsProps";
// Data
import {
  AUTO_SLIDER_DELAY,
  AUTO_SLIDER_FREQUENCY,
  AUTO_SLIDER_RESTART,
  facilityImages,
} from "@/data";
// SCSS
import facilitiesSliderStyles from "../../scss/components/home/FacilitiesSlider.module.scss";
// Hooks
import useModalTransition from "@/hooks/useModalTransition";

const FacilitiesSlider: FC = () => {
  const [showSliderButtons, setShowSliderButtons] = useState<boolean>(false);
  const [stopAutoImages, setStopAutoImages] = useState<boolean>(false);
  const [imageId, setImageId] = useState<number>(0);

  const handlePrevImage = () => {
    setImageId((prevImageId) =>
      prevImageId - 1 < 0 ? facilityImages.length - 1 : prevImageId - 1
    );
  };

  const handleNextImage = () => {
    setImageId((prevImageId) =>
      prevImageId + 1 > facilityImages.length - 1 ? 0 : prevImageId + 1
    );
  };

  useAutoImages(stopAutoImages, handleNextImage);
  useResetAutoImages(setStopAutoImages, stopAutoImages);

  return (
    <div
      className={facilitiesSliderStyles.facilitiesSliderContainer}
      onMouseEnter={() => setShowSliderButtons(true)}
      onMouseLeave={() => setShowSliderButtons(false)}
    >
      <div className={facilitiesSliderStyles.facilitiesSliderContainer__images}>
        {facilityImages?.map((image, imageIndex) => {
          let pos = "next";

          if (imageId === imageIndex) {
            pos = "current";
          } else if (
            imageIndex + 1 === imageId ||
            (imageIndex === facilityImages.length - 1 && imageId === 0)
          ) {
            pos = "prev";
          }

          return (
            <Image
              src={image.logoUrl}
              alt={image.title}
              title={image.title}
              className={facilitiesSliderStyles[pos]}
              width={1000}
              height={1000}
              key={image.id}
            />
          );
        })}
      </div>
      <SliderButtons
        handleNextImage={handleNextImage}
        handlePrevImage={handlePrevImage}
        setStopAutoImages={setStopAutoImages}
        show={showSliderButtons}
      />
      <form
        className={facilitiesSliderStyles.facilitiesSliderContainer__imagesMap}
      >
        {facilityImages?.map((image, imageIndex) => {
          return (
            <input
              type="radio"
              name="imageId"
              value={imageIndex}
              title={image.id.toString()}
              key={image.id}
              onChange={() => {
                setStopAutoImages(true);
                setImageId(imageIndex);
              }}
              checked={imageId === image.id - 1}
            />
          );
        })}
      </form>
    </div>
  );
};

const SliderButtons: FC<SliderButtonsProps> = ({
  handleNextImage,
  handlePrevImage,
  setStopAutoImages,
  show,
}) => {
  const sliderButtonsRef = useRef<HTMLDivElement>(null);

  useModalTransition(show, sliderButtonsRef);

  return (
    <div
      className={facilitiesSliderStyles.facilitiesSliderContainer__buttons}
      ref={sliderButtonsRef}
    >
      <button
        type="button"
        title="Inapoi"
        onClick={() => {
          setStopAutoImages(true);
          handlePrevImage();
        }}
      >
        &lt;
      </button>
      <button
        type="button"
        title="Inainte"
        onClick={() => {
          setStopAutoImages(true);
          handleNextImage();
        }}
      >
        &gt;
      </button>
    </div>
  );
};

const useAutoImages = (
  stopAutoImages: boolean,
  handleNextImage: () => void
) => {
  useEffect(() => {
    let interval: NodeJS.Timer;
    let timeout: NodeJS.Timeout;
    // eslint-disable-next-line prefer-const
    if (!stopAutoImages) {
      timeout = setTimeout(() => {
        interval = setInterval(() => {
          handleNextImage();
        }, AUTO_SLIDER_FREQUENCY);
      }, AUTO_SLIDER_DELAY);
    }
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [AUTO_SLIDER_DELAY, AUTO_SLIDER_FREQUENCY, stopAutoImages]);
};

const useResetAutoImages = (
  setStopAutoImages: (stop: boolean) => void,
  stopAutoImages: boolean
) => {
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (stopAutoImages) {
      timeout = setTimeout(() => {
        setStopAutoImages(false);
      }, AUTO_SLIDER_RESTART);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [AUTO_SLIDER_RESTART, setStopAutoImages, stopAutoImages]);
};

export default FacilitiesSlider;
