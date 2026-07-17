import { JitsiMeeting } from "@jitsi/react-sdk";

import { useParams } from "react-router-dom";
import "../styles/meetingroom.css";

function MeetingRoom(){

    const { roomName } = useParams();

    const displayName = `Guest-${Math.floor(Math.random() * 10000)}`;

    return(

        <div className="meeting-room">

            <JitsiMeeting

                domain="meet.jit.si"

                roomName={roomName}

                configOverwrite={{

                    startWithAudioMuted:false,

                    startWithVideoMuted:false,

                    enableWelcomePage:false,

                    disableModeratorIndicator:false,

                    prejoinPageEnabled:true,

                    enableClosePage:false,

                    disableDeepLinking:true,

                    resolution:720

                }}

                interfaceConfigOverwrite={{

                    MOBILE_APP_PROMO:false,

                    SHOW_JITSI_WATERMARK:false,

                    SHOW_BRAND_WATERMARK:false,

                    SHOW_POWERED_BY:false,

                    DEFAULT_BACKGROUND:"#ffffff"

                }}

                userInfo={{

                    displayName:displayName

                }}

                getIFrameRef={(iframe)=>{

                    iframe.style.height="100vh";

                    iframe.style.width="100%";

                    iframe.style.border="none";

                }}
                onApiReady={(api)=>{

                    api.addListener(

                        "videoConferenceJoined",

                        ()=>{

                            console.log(

                                "Meeting Joined"

                            );

                        }

                    );

                    api.addListener(

                        "participantJoined",

                        (participant)=>{

                            console.log(

                                "Participant Joined",

                                participant

                            );

                        }

                    );

                    api.addListener(

                        "participantLeft",

                        (participant)=>{

                            console.log(

                                "Participant Left",

                                participant

                            );

                        }

                    );

                    api.addListener(

                        "readyToClose",

                        ()=>{

                            window.history.back();

                        }

                    );

                }}

            />

        </div>

    );

}

export default MeetingRoom;