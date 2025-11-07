import React, { useState } from "react";
import "./image-link-form-styles.css";

const returnClarifaiJSONRequestOptions = (imageURL) => {
  const PAT = "b77ca86b662d47d5b001f51cf91bfe1a";
  const USER_ID = "clarifai";
  const APP_ID = "main";

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: imageURL,
          },
        },
      },
    ],
  });

  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };
};

const ImageLinkForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [boxes, setBoxes] = useState([]); // Multiple boxes now

  // Calculate multiple face locations
  const calculateFaceLocations = (data) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return data.outputs[0].data.regions.map((region) => {
      const boundingBox = region.region_info.bounding_box;
      return {
        leftCol: boundingBox.left_col * width,
        topRow: boundingBox.top_row * height,
        width: (boundingBox.right_col - boundingBox.left_col) * width,
        height: (boundingBox.bottom_row - boundingBox.top_row) * height,
      };
    });
  };

  const displayBoundingBoxes = (boxes) => {
    setBoxes(boxes);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const onPictureSubmit = () => {
    setImageURL(inputValue);
    fetch(
      "https://api.clarifai.com/v2/models/face-detection/outputs",
      returnClarifaiJSONRequestOptions(inputValue)
    )
      .then((response) => response.json())
      .then((result) => {
        const faceBoxes = calculateFaceLocations(result);
        displayBoundingBoxes(faceBoxes);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div>
        <h4>
          This Magic Brain will detect faces in your picture. Give it a try!
        </h4>
      </div>
      <div className="form">
        <input
          type="text"
          placeholder="Enter a URL"
          value={inputValue}
          onChange={handleChange}
        />
        <button onClick={onPictureSubmit}>Detect</button>
      </div>

      {/* Wrapper for image + bounding boxes */}
      <div className="image-wrapper">
        {imageURL && (
          <img
            id="inputImage"
            alt="Detected face"
            src={imageURL}
            width="450px"
            height="auto"
          />
        )}
        {boxes.map((box, index) => (
          <div
            key={index}
            className="bounding-box"
            style={{
              left: box.leftCol,
              top: box.topRow,
              width: box.width,
              height: box.height,
            }}
          ></div>
        ))}
      </div>
    </>
  );
};

export default ImageLinkForm;
