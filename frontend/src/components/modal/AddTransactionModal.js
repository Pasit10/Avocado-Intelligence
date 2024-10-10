import { useState, useRef } from "react";
import { Button } from 'react-bootstrap';
import BoxAddTransaction from "../boxs/BoxAddTransaction";
import Loading from "../loading/Loading";

const AddTransactionModal = ({
    handleAddClose,
    imagePreview,
    setImagePreview,
    handleAddTransaction,
    selectedProductAddTransaction,
    setSelectedProductAddTransaction,
    isBtnLoading
}) => {
    const [listProduct, setListProduct] = useState([]);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleAddCloseBtn = () => {
        handleAddClose();
        setListProduct([]);
        if (isCameraOpen) {
            stopCamera();
        }
    };

    const startCamera = async () => {
        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (err) {
            console.error("Error accessing webcam: ", err);
        }
    };

    const stopCamera = () => {
        const stream = videoRef.current.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
        setIsCameraOpen(false);
    };

    const takeShot = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        // Get the captured image as a data URL and set it for preview
        const imageDataUrl = canvas.toDataURL("image/png");
        setImagePreview(imageDataUrl);
        stopCamera();  // Stop the camera after taking the shot
    };

    const resetCamera = () => {
        setImagePreview(null); // Reset the image preview
        startCamera(); // Start the camera again
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Transaction</h5>
                        <button type="button" className="btn-close" onClick={handleAddCloseBtn}></button>
                    </div>
                    <div className="modal-body d-flex">
                        <div className="me-3" style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            {imagePreview ? (
                                <>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="img-thumbnail mt-2"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                    <Button variant="primary" onClick={resetCamera} className="mt-3">Take Another Shot</Button>
                                </>
                            ) : isCameraOpen ? (
                                <>
                                    <video ref={videoRef} autoPlay style={{ width: '100%' }}></video>
                                    <Button variant="primary" onClick={takeShot} className="mt-3">Shot</Button>
                                </>
                            ) : (
                                <Button variant="primary" onClick={startCamera}>Open Camera</Button>
                            )}
                            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                        </div>
                        <div style={{ flex: '2' }}>
                            <BoxAddTransaction
                                selectedRows={selectedProductAddTransaction}
                                setSelectedRows={setSelectedProductAddTransaction}
                                listProduct={listProduct}
                                setListProduct={setListProduct}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button variant="secondary" onClick={handleAddCloseBtn}>
                            Cancel
                        </Button>
                        <Button disabled={isBtnLoading} variant="primary" onClick={handleAddTransaction}>
                            {isBtnLoading ? (<Loading n={2} />) : (<div>Add</div>)}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTransactionModal;