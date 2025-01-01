const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const webrtc = require("wrtc");
const cors = require("cors");

let senderStream;

const iceServers = [
  {
    urls: "stun:stun.stunprotocol.org",
  },
];

// Middleware
app.use(express.static("webrtc/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Route pour le viewer
app.post("/consumer", async ({ body }, res) => {
  const peer = new webrtc.RTCPeerConnection({ iceServers });
  const desc = new webrtc.RTCSessionDescription(body.sdp);
  await peer.setRemoteDescription(desc);

  senderStream.getTracks().forEach((track) => peer.addTrack(track, senderStream));

  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);

  res.json({ sdp: peer.localDescription });
});

// Route pour le streamer
app.post("/broadcast", async ({ body }, res) => {
  const peer = new webrtc.RTCPeerConnection({ iceServers });
  peer.ontrack = (e) => handleTrackEvent(e, peer);

  const desc = new webrtc.RTCSessionDescription(body.sdp);
  await peer.setRemoteDescription(desc);

  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);

  res.json({ sdp: peer.localDescription });
});

// Gestion des flux
function handleTrackEvent(e, peer) {
  senderStream = e.streams[0];
}

app.listen(5000, () => console.log("Server started on port 5000"));
