"use client";

import { useEffect, useRef, useState } from "react";
import { Room, RoomEvent, Track, createLocalTracks, createLocalScreenTracks, LocalTrack } from "livekit-client";
import { Monitor, MonitorOff, Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { createLiveKitRoom, getLiveKitToken } from "@/src/services";
import { ChatMsg } from "@/src/constants";

const ChatMessage = ({ msg }: { msg: ChatMsg }) => (
    <div className={`mb-2 ${msg.self ? "text-right" : "text-left"}`}>
        <span className="font-semibold">{msg.user}</span>
        <div>{msg.text}</div>
    </div>
);

export default function CallPage() {
    const roomRef = useRef<Room | null>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const audioContainerRef = useRef<HTMLDivElement>(null);
    const cameraContainerRef = useRef<HTMLDivElement>(null);
    const screenTrackRef = useRef<LocalTrack | null>(null);
    const screenContainerRef = useRef<HTMLDivElement>(null);

    const [micEnabled, setMicEnabled] = useState(true);
    const [camEnabled, setCamEnabled] = useState(true);
    const [screenSharing, setScreenSharing] = useState(false);
    const [connected, setConnected] = useState(false);
    const [hasMic, setHasMic] = useState(true);
    const [hasCam, setHasCam] = useState(true);

    const [inputRoom, setInputRoom] = useState("");
    const [messages, setMessages] = useState<ChatMsg[]>([]);
    const [chatInput, setChatInput] = useState("");

    function attachTrack(track: Track) {
        const el = track.attach();

        if (track.kind === Track.Kind.Video) {
            if (track.source === Track.Source.ScreenShare) {
                el.className = "h-full w-full object-contain bg-black";
                screenContainerRef.current?.replaceChildren(el);
            } else {
                const { wrapper, video } = createRemoteCameraContainer();
                track.attach(video);
                cameraContainerRef.current?.appendChild(wrapper);
            }
        }

        if (track.kind === Track.Kind.Audio) {
            audioContainerRef.current?.appendChild(el);
        }
    }

    async function handleCreateRoom() {
        const roomName = await createLiveKitRoom();
        setInputRoom(roomName);
    }

    async function createSafeLocalTracks() {
        const devices = await navigator.mediaDevices.enumerateDevices();

        const hasMic = devices.some((d) => d.kind === "audioinput");
        const hasCam = devices.some((d) => d.kind === "videoinput");

        setHasMic(hasMic);
        setHasCam(hasCam);
        setMicEnabled(hasMic);
        setCamEnabled(hasCam);

        if (!hasMic && !hasCam) {
            return [];
        }

        try {
            const tracks = await createLocalTracks({
                audio: hasMic,
                video: hasCam,
            });

            return tracks;
        } catch (e) {
            console.warn("Create local tracks failed:", e);
            setMicEnabled(false);
            setCamEnabled(false);
            return [];
        }
    }

    async function joinCall() {
        if (!inputRoom.trim()) return alert("Please enter room name");

        const room = new Room({ adaptiveStream: true, dynacast: true });
        roomRef.current = room;

        const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

        if (!livekitUrl) {
            throw new Error("NEXT_PUBLIC_LIVEKIT_URL is not defined");
        }

        try {
            const token = await getLiveKitToken(inputRoom);
            await room.connect(livekitUrl, token);
            setConnected(true);
        } catch (e) {
            console.error("Connect failed:", e);
            alert("Cannot connect to room!");
            return;
        }

        const tracks = await createSafeLocalTracks();

        tracks.forEach((t) => room.localParticipant.publishTrack(t));

        const localVideo = tracks.find((t) => t.kind === Track.Kind.Video);
        if (localVideo && localVideoRef.current) {
            localVideo.attach(localVideoRef.current);
        }

        room.on(RoomEvent.TrackSubscribed, (track) => {
            attachTrack(track);
        });

        room.on(RoomEvent.TrackUnsubscribed, (track) => {
            track.detach().forEach((el) => el.remove());
        });

        room.remoteParticipants.forEach((p) => {
            p.trackPublications.forEach((pub) => {
                if (pub.isSubscribed && pub.track) {
                    attachTrack(pub.track);
                }
            });
        });

        room.on(RoomEvent.DataReceived, (payload, participant) => {
            const text = new TextDecoder().decode(payload);
            setMessages((prev) => [...prev, { user: participant?.name || "Guest", text, self: false }]);
        });

        room.on(RoomEvent.Disconnected, (reason) => {
            console.warn("Disconnected:", reason);
            leaveCall();
        });
    }

    function toggleMic() {
        const room = roomRef.current;
        if (!room) return;

        const pub = room.localParticipant.getTrackPublication(Track.Source.Microphone);
        if (!pub || !pub.track) return;

        const next = !micEnabled;
        room.localParticipant.setMicrophoneEnabled(next);
        setMicEnabled(next);
    }

    function toggleCamera() {
        const room = roomRef.current;
        if (!room) return;

        const pub = room.localParticipant.getTrackPublication(Track.Source.Camera);
        if (!pub || !pub.track) return;

        const next = !camEnabled;
        room.localParticipant.setCameraEnabled(next);
        setCamEnabled(next);
    }

    async function toggleScreenShare() {
        const room = roomRef.current;
        if (!room) return;

        try {
            if (!screenSharing) {
                const tracks = await createLocalScreenTracks({
                    video: true,
                    audio: false,
                });

                if (!tracks.length) return;

                const track = tracks[0];
                screenTrackRef.current = track;

                await room.localParticipant.publishTrack(track);
                setScreenSharing(true);

                track.mediaStreamTrack.onended = () => {
                    room.localParticipant.unpublishTrack(track);
                    setScreenSharing(false);
                    screenContainerRef.current?.replaceChildren();
                };

                const el = track.attach();
                screenContainerRef.current?.replaceChildren(el);
            } else {
                const track = screenTrackRef.current;
                if (!track) return;

                room.localParticipant.unpublishTrack(track);
                track.stop();
                setScreenSharing(false);
                screenContainerRef.current?.replaceChildren();
            }
        } catch (err) {
            console.warn("Screen share canceled or failed:", err);
        }
    }

    function leaveCall() {
        roomRef.current?.disconnect();
        roomRef.current = null;

        if (localVideoRef.current) {
            localVideoRef.current.srcObject = null;
        }

        audioContainerRef.current?.replaceChildren();

        setConnected(false);
        setMessages([]);

        screenTrackRef.current?.stop();
        screenTrackRef.current = null;
        setScreenSharing(false);
        screenContainerRef.current?.replaceChildren();
    }

    function sendChat() {
        const room = roomRef.current;
        if (!room || !chatInput.trim()) return;

        room.localParticipant.publishData(new TextEncoder().encode(chatInput), { reliable: true });

        setMessages((prev) => [...prev, { user: "You", text: chatInput, self: true }]);
        setChatInput("");
    }

    function createRemoteCameraContainer() {
        const wrapper = document.createElement("div");
        wrapper.className = `
        relative
        w-full
        aspect-video
        overflow-hidden
        rounded-xl
        bg-black
        shadow
    `;

        const video = document.createElement("video");
        video.autoplay = true;
        video.playsInline = true;
        video.className = `
        h-full
        w-full
        object-cover
    `;

        wrapper.appendChild(video);

        return { wrapper, video };
    }

    useEffect(() => {
        return () => {
            roomRef.current?.disconnect();
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-6xl space-y-6 rounded-2xl bg-white p-6 shadow-lg">
                <h2 className="text-center text-2xl font-bold text-gray-800">LiveKit Call</h2>

                {!connected ? (
                    <div className="flex flex-col items-center gap-3 sm:flex-row">
                        <button
                            onClick={handleCreateRoom}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Create Room
                        </button>

                        <input
                            placeholder="Enter Room ID"
                            value={inputRoom}
                            onChange={(e) => setInputRoom(e.target.value)}
                            className="w-full rounded-lg border px-3 py-2 sm:flex-1"
                        />

                        <button
                            onClick={joinCall}
                            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        >
                            Join Call
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="relative flex h-[520px] overflow-hidden rounded-2xl bg-black">
                            <div ref={screenContainerRef} className="flex flex-1 items-center justify-center" />

                            <div
                                ref={cameraContainerRef}
                                className="w-64 space-y-3 overflow-y-auto border-l border-white/10 bg-black/40 p-3"
                            />

                            <video
                                ref={localVideoRef}
                                autoPlay
                                muted
                                playsInline
                                className="absolute right-4 bottom-4 h-36 w-52 rounded-xl border border-white/20 object-cover shadow-xl"
                            />

                            <div className="absolute right-0 bottom-0 left-0 flex justify-center gap-4 bg-gradient-to-t from-black/70 to-transparent py-4">
                                <>
                                    <button
                                        onClick={toggleMic}
                                        disabled={!hasMic}
                                        className={`rounded-full p-3 text-white transition ${
                                            !hasMic
                                                ? "cursor-not-allowed bg-gray-400 opacity-50"
                                                : micEnabled
                                                  ? "bg-gray-700 hover:bg-gray-800"
                                                  : "bg-red-600 hover:bg-red-700"
                                        } `}
                                    >
                                        {micEnabled ? <Mic /> : <MicOff />}
                                    </button>

                                    <button
                                        onClick={toggleCamera}
                                        disabled={!hasCam}
                                        className={`rounded-full p-3 text-white transition ${
                                            !hasCam
                                                ? "cursor-not-allowed bg-gray-400 opacity-50"
                                                : camEnabled
                                                  ? "bg-gray-700 hover:bg-gray-800"
                                                  : "bg-red-600 hover:bg-red-700"
                                        } `}
                                    >
                                        {camEnabled ? <Video /> : <VideoOff />}
                                    </button>

                                    <button
                                        onClick={toggleScreenShare}
                                        className={`rounded-full p-3 text-white ${
                                            screenSharing ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-800"
                                        }`}
                                    >
                                        {screenSharing ? <MonitorOff /> : <Monitor />}
                                    </button>

                                    <button
                                        onClick={leaveCall}
                                        className="rounded-full bg-red-600 p-3 text-white hover:bg-red-700"
                                    >
                                        <PhoneOff />
                                    </button>
                                </>
                            </div>
                        </div>

                        <div className="mx-auto max-w-md rounded-xl border bg-white p-4 shadow">
                            <h4 className="mb-2 font-semibold text-gray-700">Chat</h4>

                            <div className="mb-3 max-h-40 space-y-2 overflow-y-auto">
                                {messages.map((msg, i) => (
                                    <ChatMessage key={i} msg={msg} />
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <input
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && sendChat()}
                                    className="flex-1 rounded-lg border px-3 py-2"
                                    placeholder="Type a message..."
                                />
                                <button
                                    onClick={sendChat}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Send
                                </button>
                            </div>
                        </div>

                        <div ref={audioContainerRef} />
                    </>
                )}
            </div>
        </div>
    );
}
