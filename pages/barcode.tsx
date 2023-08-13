import styles from '@styles/Home.module.css'
import { Flex, Heading, Text } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { secureStorage } from '@utils/secureStorage'
// @ts-ignore
import Quagga from '@ericblade/quagga2'

const Scanner = dynamic(() => import('@components/Scanner'))
const FooterComponent = dynamic(() => import('@components/Footer'))


export default function Barcode() {
    const [scanning, setScanning] = useState<Boolean>(false); // toggleable state for "should render scanner"
    const [cameras, setCameras] = useState([]); // array of available cameras, as returned by Quagga.CameraAccess.enumerateVideoDevices()
    const [cameraId, setCameraId] = useState(null); // id of the active camera device
    const [cameraError, setCameraError] = useState(null); // error message from failing to access the camera
    const [results, setResults] = useState([]); // list of scanned results
    const [torchOn, setTorch] = useState(false); // toggleable state for "should torch be on"
    const scannerRef = useRef(null); // reference to the scanner element in the DOM

    useEffect(() => {
        const enableCamera = async () => {
            await Quagga.CameraAccess.request(null, {});
        };
        const disableCamera = async () => {
            await Quagga.CameraAccess.release();
        };
        const enumerateCameras = async () => {
            const cameras = await Quagga.CameraAccess.enumerateVideoDevices();
            console.log('Cameras Detected: ', cameras);
            return cameras;
        };
        enableCamera()
        .then(disableCamera)
        .then(enumerateCameras)
        .then((cameras) => setCameras(cameras))
        .then(() => Quagga.CameraAccess.disableTorch()) // disable torch at start, in case it was enabled before and we hot-reloaded
        .catch((err) => setCameraError(err));
        return () => disableCamera();
    }, [])

    // provide a function to toggle the torch/flashlight
    const onTorchClick = useCallback(() => {
        const torch = !torchOn;
        setTorch(torch);
        if (torch) {
            Quagga.CameraAccess.enableTorch();
        } else {
            Quagga.CameraAccess.disableTorch();
        }
    }, [torchOn, setTorch]);



    return (
        <>
    <Flex height="100vh" direction="column" alignItems="center" justifyContent="center" className={styles.background}>
    <Heading size="h1" color="white">학생증 바코드 등록하기</Heading>
    <div>
            {cameraError ? <p>ERROR INITIALIZING CAMERA ${JSON.stringify(cameraError)} -- DO YOU HAVE PERMISSION?</p> : null}
            {cameras.length === 0 ? <p>Enumerating Cameras, browser may be prompting for permissions beforehand</p> :
                <form>
                    <select onChange={(event) => setCameraId(event.target.value)}>
                        {cameras.map((camera) => (
                            <option key={camera.deviceId} value={camera.deviceId}>
                                {camera.label || camera.deviceId}
                            </option>
                        ))}
                    </select>
                </form>
            }
            <button onClick={onTorchClick}>{torchOn ? 'Disable Torch' : 'Enable Torch'}</button>
            <button onClick={() => setScanning(!scanning) }>{scanning ? 'Stop' : 'Start'}</button>
            <ul className="results">
                {results.map((result) => (result.codeResult && <>{result.codeResult.code}</>))}
            </ul>
            <div ref={scannerRef} style={{position: 'relative', border: '3px solid red'}}>
                {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
                <canvas className="drawingBuffer" style={{
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    // height: '100%',
                    // width: '100%',
                    border: '3px solid green',
                }} width={260} height={240} />
                {scanning ? <Scanner scannerRef={scannerRef} cameraId={cameraId} onDetected={(result: any) => setResults([...results, result])} /> : null}
            </div>
        </div>
    </Flex>
        <FooterComponent isCode={false}/>
    </>
    )
}