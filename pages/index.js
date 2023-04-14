import React, { useEffect, useState } from "react";
import Head from "next/head";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import styles from "../styles/Home.module.css";
import JSZipUtils from "jszip-utils";

export default function Home() {
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  const getFiles = async () => {
    const res = await fetch("https://api.lagunaskuche.mx/files",{
      method: 'GET',
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTg5ZmNiNTcxMDA5OGNmMDZkNGM4NyIsInJvbGUiOiJyaCIsImlhdCI6MTY4MTM5NTU0NywiZXhwIjoxNjgxODI3NTQ3fQ.pDFcKH7t7jzlIm2fxfMKgeQg9GFm3jreqwV5mefOBT8'
      },
      mode: 'cors'
    });
    const dataJson = await res.json(); 
    const data = dataJson.data.files

    setFiles(data);
  };

  useEffect(() => {
    getFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadResourcesOnClick = async () => {

    try {
      const zip = new JSZip();
      // const remoteZips = files.map(async (file) => {

        
      // })

      const CURP = 'https://my-assets-jona.s3.amazonaws.com/cuando-es-buen-momento-para-invertir-en-un-terreno.jpg'

      const PHOTO = 'https://landrada-advisors-bucket.s3.us-east-1.amazonaws.com/1675892914936-buen-momento-para-invertir.jpg'

      JSZipUtils.getBinaryContent(CURP, function (err, data) {
        zip.file('Jonatan' + " - CURP" + ".jpg", data, {
          binary: true,
        });
      });
      JSZipUtils.getBinaryContent(PHOTO, function (err, data) {
        zip.file('Jonatan' + " - PHOTO" + ".jpg", data, {
          binary: true,
        });
      });

      JSZipUtils.getBinaryContent(CURP, function () {
        zip.generateAsync({ type: "blob" }).then(function (content) {
          saveAs(content, 'Jonatan' + " - Documentos");
        });
      });
  

      // setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Generate ZIP with file links in Next JS</title>
        <meta
          name="description"
          content="How to generate ZIP with file links in Next JS and React JS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Generate ZIP with file links in Next JS
        </h1>

        <button
          onClick={downloadResourcesOnClick}
          className={styles.button}
          disabled={loading}
        >
          Download The Zip
        </button>
      </main>
    </div>
  );
}