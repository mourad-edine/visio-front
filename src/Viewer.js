import React, { useRef } from 'react';
import axios from 'axios';

const Viewer = () => {
    const videoRef = useRef(null);

    const iceServers = [{ urls: 'stun:stunprotocol.org' }];

    const init = async () => {
        const peer = createPeer();
        peer.addTransceiver('video', { direction: 'recvonly' });
    };

    const createPeer = () => {
        const peer = new RTCPeerConnection({ iceServers });
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
        return peer;
    };

    const handleNegotiationNeededEvent = async (peer) => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);

        const { data } = await axios.post('http://localhost:5000/consumer', {
            sdp: peer.localDescription,
        });

        const desc = new RTCSessionDescription(data.sdp);
        peer.setRemoteDescription(desc);
    };

    const handleTrackEvent = (e) => {
        videoRef.current.srcObject = e.streams[0];
    };

    return (
        <div>
            <h1>visionneur</h1>
            <video ref={videoRef} autoPlay playsInline></video>
            <button onClick={init}>voir le stream</button>
        </div>
    );
};

export default Viewer;
