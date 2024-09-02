import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineReply } from "react-icons/md";
import useMode from "../hooks/useMode";

const Comment = ({ comment }) => {
    const [hasReply, setHasReply] = useState(comment.hasReply || false);
    const [reply, setReply] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [loading, setLoading] = useState(false);
    const { darkMode } = useMode();
    const [replies, setReplies] = useState(() => {
        return [];
    }, []);

    console.log(replies);
    const [toggle, setToggle] = useState(false); // Default to false (replies hidden)

    const handleReply = async (commentid) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/replycomment/${commentid}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
            body: JSON.stringify({ reply: replyText })
        });

        const data = await response.json();
        if (data.status) {
            // Update the replies state directly with the new reply
            setReplies(prevReplies => [...prevReplies, data.reply]);
            setReplyText("");
            setHasReply(true);
        }
    };


    const fetchReplies = async (commentid) => {

        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/getreplies/${commentid}`, {
                headers: {
                    'Content-Type': "application/json",
                    "auth-token": localStorage.getItem("auth-token")
                },
                method: "GET"
            });

            const data = await response.json();
            setReplies(data.replies);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
            setToggle(!toggle); // Toggle visibility after fetching
        }
    };

    console.log(comment)


    return (
        <>
            <div className="d-flex flex-start mt-4 font-open">
                <img
                    className="rounded-circle shadow-1-strong custom-comment-img"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
                    alt="avatar"
                    width="60"
                    height="60"
                />
                <div style={{ width: '100%' }}>
                    <div
                        className="d-flex align-items-center justify-content-between flex-wrap mb-1"
                        style={{ width: '100%' }}
                    >
                        <span className="badge bg-primary" >
                            {comment.userID.name}
                        </span>
                        <p className="mb-0 mx-2">
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
                        {reply && (
                            <div className="input-group input-group-sm mt-1 mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your reply"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                />
                                <button
                                    className="btn btn-sm btn-primary"
                                    disabled={replyText.length < 3}
                                    onClick={() => handleReply(comment._id)}
                                >
                                    Reply
                                </button>
                            </div>
                        )}
                        {hasReply && (
                           !loading && !toggle ? <Link
                                className="ml-5"
                                style={{ fontSize: "12px", color: darkMode ? "white" : "black" }}
                                to="#"
                                onClick={() => {
                                    fetchReplies(comment._id)
                                    setToggle(!toggle);
                                }}
                            >
                                Show Replies
                            </Link> : <Link
                                className="ml-5"
                                style={{ fontSize: "12px", color: darkMode ? "white" : "black" }}
                                to="#"
                                onClick={() => {
                                    setToggle(!toggle);
                                }}
                            >
                                Hide Replies
                            </Link>

                        )}
                        {loading ? <p>Loading....</p> : toggle && replies && replies.length > 0 && replies.map(reply => (
                            <div key={reply._id} className="d-flex flex-start mt-4 font-open">
                                <img
                                    className="rounded-circle shadow-1-strong custom-comment-img"
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
                                    alt="avatar"
                                    width="60"
                                    height="60"
                                />
                                <div style={{ width: '100%' }}>
                                    <div
                                        className="d-flex align-items-center justify-content-between mb-1"
                                        style={{ width: '100%' }}
                                    >
                                        <span className="badge bg-primary" >
                                            {reply.userId.name}
                                        </span>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className='d-flex align-items-center'>
                                            <p className="mb-0">{reply.text}</p>
                                            <MdOutlineReply
                                                className="cursor-pointer mx-2"
                                                size={20}
                                                title="Reply"
                                                onClick={() => setReply(!reply)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comment;
