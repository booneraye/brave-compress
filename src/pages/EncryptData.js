import React, { useState } from "react";
import CryptoJS from "crypto-js";
import {
  Button,
  Col,
  FormGroup,
  FormInput,
  FormTextarea,
  Row,
} from "shards-react";
import Header from "../components/Header";

const EncryptData = () => {
  const [secretKey, setSecretKey] = useState("");
  const [data, setData] = useState("");
  const [result, setResult] = useState("");

  const encryptMessage = (value) => {
    let cipherText = CryptoJS.AES.encrypt(value, secretKey);

    return window.btoa(cipherText.toString());
  };

  const decryptMessage = (value) => {
    let bytes = CryptoJS.AES.decrypt(window.atob(value), secretKey);
    let decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return decrypted;
  };

  return (
    <div>
      <Header />
      <Row>
        <Col md={6} style={{ padding: 10 }}>
          <FormGroup>
            <label>SECRET KEY</label>
            <FormInput
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="secret key"
              type="password"
            />
          </FormGroup>

          <FormGroup>
            <FormTextarea onChange={(e) => setData(e.target.value)}  rows={12}>
              {data}
            </FormTextarea>
          </FormGroup>

          <Button onClick={() => setResult(encryptMessage(data))} style={{margin: 5}}>
            Encrypt
          </Button>

          <Button onClick={() => setResult(decryptMessage(data))}>
            Decrypt
          </Button>
        </Col>
        <Col md={6} style={{ padding: 10 }}>
          <FormGroup rows={12}>
            <label>Result</label>
            <FormTextarea value={result} />
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

export default EncryptData;
