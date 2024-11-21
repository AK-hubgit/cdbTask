import React, { useState } from "react";
import { useViewport } from "react-viewport-hooks";
import "../css/Stepper.css";
import { model } from "../data";

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < model.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const MobileFileCaption = "to Attach File";
  const WebfFleCaption = "or Drag and Drop to Attach File";
  const { vw } = useViewport();

  const renderField = (field) => {
    switch (field.type) {
      case "string":
        return <input type="text" placeholder={field.fieldName} />;
      case "dropdown":
        return (
          <select>
            {field.selectableValues.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            className="addtxtarea"
            name="w3review"
            rows="5"
            cols="80"
            placeholder={field.fieldName}
          />
        );
      case "file":
        return (
          <>
            {/*  <label>
              Browse to Attach File
              <input type="file" />
            </label> */}
            <label htmlFor="file-upload" className="custom-file-upload">
              <span className="highlightBlue">Browse</span>{" "}
              {vw < 768 ? MobileFileCaption : WebfFleCaption}
            </label>
            <input id="file-upload" type="file" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {vw > 425 ? (
        <div className="container">
          <div className="title">
            <p>CB</p>
            <p>CloudBankin</p>
          </div>
          <div className="title">
            <p>GC</p>
            <p>George Clark</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="body">
        {/* Stepper Header */}
        <div className="stepper-header">
          {model.map((step, index) => (
            <div
              key={index}
              className={`step ${index === currentStep ? "active" : ""}`}
            >
              <div
                className={`pagination ${
                  index === currentStep ? "active" : ""
                }`}
              >
                {step.pagination}
              </div>
              <p className="smp">{step.pageName}</p>
            </div>
          ))}
        </div>

        <div className="stepper-container">
          <h2>{model[currentStep].pageName}</h2>
          {/* Step Content */}
          <div className="step-content">
            {model[currentStep].fields.map((field) => (
              <div
                key={field.fieldId}
                className={`form-group ${
                  ["1", "2", "3"].includes(field.fieldId)
                    ? "form-group flex"
                    : ""
                }`}
              >
                <label>{field.fieldName}</label>
                {renderField(field)}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="stepper-buttons">
            <button onClick={prevStep} disabled={currentStep === 0}>
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === model.length - 1}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stepper;
