import React, { useState } from 'react';

import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { useDispatch } from 'react-redux';

import {
  setProductId,
  toggleBarcodeScanner,
} from '../redux/slices/productSlice';

const BarcodeScanner = () => {
  const dispatch = useDispatch();

  const handleSetProductId = () => {
    dispatch(setProductId(data));
    dispatch(toggleScannerClose());
  };

  const toggleScannerClose = () => {
    dispatch(toggleBarcodeScanner());
  };
  const [data, setData] = useState('Not Found');

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Scan Barcode</h2>
        <div style={styles.cameraView}>
          <BarcodeScannerComponent
            height={250}
            torch={true}
            width="100%"
            onUpdate={(err, result) => {
              if (result) setData(result.text);
              else setData('Not Found');
            }}
          />
        </div>
        <p>{data}</p>
        <button onClick={toggleScannerClose}>Close</button>
        <button disabled={data === 'Not Found'} onClick={handleSetProductId}>
          Set Product ID
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  cameraView: {
    width: '100%',
    height: 'auto',
    margin: '20px 0',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  scanResult: {
    marginTop: '15px',
    fontSize: '16px',
    color: '#007bff',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default BarcodeScanner;
