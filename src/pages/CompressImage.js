import React, { useState, useEffect } from "react";
import PageContainer from "../components/PageContainer";
import {
  Row,
  Col,
  Slider,
  FormGroup,
  FormInput,
  ListGroup,
  ListGroupItem,
  Button,
} from "shards-react";
import imageCompression from "browser-image-compression";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const CompressImage = () => {
  const [compressLevel, setCompressLevel] = useState(10);
  const [qualityLevel, setQualityLevel] = useState(0);

  //Data
  const [fileData, setFileData] = useState([]);
  const [compressedData, setCompressedData] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  const [fileList, setFileList] = useState([]);

  const onChange = (e) => {
    let files = e.target.files;

    setFileList(e);

    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);

    setFileData(files[0]);
    const controller = new AbortController();

    const options = {
      // other options here
      //   maxSizeMB: 0.1,
      signal: controller.signal,
      //   maxIteration: compressLevel,
      initialQuality: qualityLevel,
    };

    imageCompression(files[0], options)
      .then(function (compressedFile) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(compressedFile);

        setCompressedData(compressedFile);

        fileReader.onload = (event) => {
          console.log(event.target);
          setSelectedImage(event.target.result);
        };
      })
      .catch(function (error) {
        console.log(error.message); // output: I just want to stop
      });
  };

  console.log(fileData);

  useEffect(() => {
    if (fileList.length !== 0) {
      onChange(fileList);
    }
  }, [qualityLevel]);

  return (
    <PageContainer>
      <Row>
        <Col md={5}>
          <FormGroup>
            {/* <p>Compress Level: {compressLevel}</p> */}
            <p>Quality Level: {qualityLevel}</p>
            {/* <Slider
              connect={[true, false]}
              start={compressLevel}
              range={{ min: 10, max: 20 }}
              onSlide={(e) => setCompressLevel(parseFloat(e[0]))}
            /> */}
            <Slider
              connect={[true, false]}
              start={qualityLevel}
              range={{ min: 0, max: 10 }}
              onSlide={(e) => setQualityLevel(parseFloat(e[0]))}
            />
            <FormInput
              placeholder="My form input"
              type="file"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <ListGroup>
              <ListGroupItem>File Data</ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md={4} style={{ fontWeight: "500" }}>
                    Name:{" "}
                  </Col>
                  <Col md={8}>{fileData.name}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md={4} style={{ fontWeight: "500" }}>
                    Type:{" "}
                  </Col>
                  <Col md={8}>{fileData.type}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md={4} style={{ fontWeight: "500" }}>
                    Size:
                  </Col>
                  <Col md={8}>{(fileData.size / 1024).toFixed(2)} KB</Col>
                </Row>
              </ListGroupItem>
            </ListGroup>

            <ListGroup style={{ marginTop: 15 }}>
              <ListGroupItem>
                <Row>
                  <Col md={4} style={{ fontWeight: "500" }}>
                    New File Size:
                  </Col>
                  <Col md={8}>{(compressedData.size / 1024).toFixed(2)} KB</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md={4} style={{ fontWeight: "500" }}>
                    Compressed %
                  </Col>
                  <Col md={8}>
                    {((compressedData.size / fileData.size) * 100).toFixed(2)} %
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </FormGroup>
        </Col>
        <Col md={6}>
          <div style={{ height: "200px" }}>
            {selectedImage && (
              <FormGroup>
                <img src={selectedImage} style={{ width: "50%" }} />

                <a
                  href={selectedImage}
                  download={fileData.name}
                  style={{ display: "block" }}
                >
                  <Button style={{ marginTop: 10 }}>
                    <FontAwesomeIcon icon={faDownload} />
                    Download
                  </Button>
                </a>
              </FormGroup>
            )}
          </div>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default CompressImage;
