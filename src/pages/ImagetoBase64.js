import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import Header from "../components/Header";
import {
  Button,
  Col,
  FormGroup,
  FormInput,
  FormTextarea,
  Row,
} from "shards-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ImagetoBase64 = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [copied, setCopied] = useState(false);

  const onFileChange = (e) => {
    let files = e.target.files;

    const controller = new AbortController();

    console.log(files);

    if (["application/pdf"].includes(files[0].type)) {
      let fileToLoad = files[0];
      // FileReader function for read the file.
      let fileReader = new FileReader();
      // Onload of file read the file content
      fileReader.onload = function (fileLoadedEvent) {
        let file = fileLoadedEvent.target.result;
        // Print data in console
        setSelectedImage(file);
      };
      // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    } else if (
      ["image/png", "image/jpeg", "image/jpg"].includes(files[0].type)
    ) {
      const options = {
        // other options here
        maxSizeMB: 0.1,
        signal: controller.signal,
        maxIteration: 20,
      };

      imageCompression(files[0], options)
        .then(function (compressedFile) {
          let fileReader = new FileReader();
          fileReader.readAsDataURL(compressedFile);

          fileReader.onload = (event) => {
            setSelectedImage(event.target.result);
          };
        })
        .catch(function (error) {
          console.log(error.message); // output: I just want to stop
        });
    }
  };

  return (
    <div>
      <Header />
      <Row>
        <Col md={6} style={{ padding: 10 }}>
          <FormGroup>
            <label>Upload File</label>
            <FormInput type="file" onChange={(e) => onFileChange(e)} />
          </FormGroup>
        </Col>
        <Col md={12} style={{ padding: 10 }}>
          <FormGroup>
            <label>Result:</label>
            <FormTextarea rows={15} value={selectedImage} />
            {selectedImage && (
              <CopyToClipboard
                text={selectedImage}
                onCopy={() => setCopied(true)}
              >
                <Button theme="secondary" style={{ margin: 5 }}>
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </CopyToClipboard>
            )}
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ImagetoBase64;
