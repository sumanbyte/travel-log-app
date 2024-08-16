import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineReply } from "react-icons/md";
import useMode from "../hooks/useMode"

const Reply = ({ comment, }) => {
    const [reply, setReply] = useState(false);
    const [replyText, setReplyText] = useState("");
    const { darkMode } = useMode();
    const [replies, setReplies] = useState(null);
    const [toggle, setToggle] = useState(true);

    const handleReply = async (commentid) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/replycomment/${commentid}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
            body: JSON.stringify({ reply: replyText })
        })

        const data = await response.json();
        if (data.status) {
            setReplyText("");
        }
        // console.log(data)
    }

    const fetchReplies = async (commentid) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/getreplies/${commentid}`, {
            headers: {
                'Content-Type': "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
        });

        const data = await response.json();

        setReplies(data.replies)
        console.log(data)
    }

    return (
        <>

            <div className="d-flex flex-start mt-4 font-open">
                <img
                    className="rounded-circle shadow-1-strong me-3"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
                    alt="avatar"
                    width="60"
                    height="60"
                />
                <div style={{ width: '100%' }}>
                    <h6 className="fw-bold mb-1">{comment.userName}</h6>
                    <div
                        className="d-flex align-items-center justify-content-between mb-1"
                        style={{ width: '100%' }}
                    >
                        <span className="badge bg-primary" style={{ fontSize: '13px' }}>
                            {comment.userID.name}
                        </span>
                        <p className="mb-0 mx-2" style={{ fontSize: '15px' }}>
                            {new Date(comment.createdAt).toDateString()}
                        </p>
                    </div>
                    <div className="d-flex flex-column">
                        <div className='d-flex align-items-center'>
                            <p className="mb-0">{comment.comment}</p>
                            <MdOutlineReply
                                className="cursor-pointer mx-2"
                                size={20}
                                title="Reply"
                                onClick={() => setReply(!reply)}
                            />
                        </div>
                        {
                            reply && <div className="input-group input-group-sm mt-1 mb-3">
                                <input type="text" className="form-control" placeholder='Enter your reply' value={replyText} onChange={(e) => { setReplyText(e.target.value) }} />
                                <button className='btn btn-sm btn-primary' disabled={replyText.length >= 3 ? false : true} onClick={() => handleReply(comment._id)}>Reply</button>
                            </div>

                        }
                        {
                            comment.hasReply ? <Link className="ml-5" style={{ fontSize: "12px", color: darkMode ? "white" : "black" }} to={`#`} onClick={() => {
                                fetchReplies(comment._id)
                                setToggle(!toggle);
                            }
                            }>{toggle ? "View Replies" : "Hide Replies"}</Link> : ""
                        }
                        {
                            !toggle && replies && replies.map(reply => {
                                return <p key={reply._id}>{reply.text}</p>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reply
