import React, { useRef } from 'react';
import axios from 'axios';

const StreamerDashboard = () => {
    const videoRef = useRef(null);

    const iceServers = [{ urls: 'stun:stun.stunprotocol.org' }];

    const init = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;

        const peer = createPeer();
        stream.getTracks().forEach(track => peer.addTrack(track, stream));
    };

    const createPeer = () => {
        const peer = new RTCPeerConnection({ iceServers });
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
        return peer;
    };

    const handleNegotiationNeededEvent = async (peer) => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);

        const { data } = await axios.post('http://localhost:5000/broadcast', {
            sdp: peer.localDescription,
        });

        const desc = new RTCSessionDescription(data.sdp);
        peer.setRemoteDescription(desc);
    };

    return (
        <div>
            <h1>vendeur(se)</h1>
            <video ref={videoRef} autoPlay playsInline></video>
            <button onClick={init}>commencer à Streamer</button>
        </div>
    );
};

export default StreamerDashboard;
