import { useState } from "react";
import { MdOutlineReply } from "react-icons/md";

const Reply = ({ comment, }) => {
    const [reply, setReply] = useState(false);
    const [replyText, setReplyText] = useState("");

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
                                <button className='btn btn-sm btn-primary' disabled={replyText.length >= 3 ? false : true}>Reply</button>
                            </div>

                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reply
