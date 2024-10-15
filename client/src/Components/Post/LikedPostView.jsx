import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { likeService } from "../../Services";
import { Button, PostListView } from "..";
import { icons } from "../../Assets/icons";

export default function LikedPostView({ post, reference }) {
    const { post_id } = post;
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    async function toggleLike() {
        try {
            const res = await likeService.togglePostLike(post_id, true);
            if (res && res.message === "POST_LIKE_TOGGLED_SUCCESSFULLY") {
                setIsLiked((prev) => !prev);
            }
        } catch (err) {
            navigate("/server-error");
        }
    }

    return (
        <PostListView post={post} reference={reference}>
            {/* children */}
            <div className="absolute top-2 right-2" onClick={(e) => e.stopPropagation}>
                <Button
                    btnText={
                        <div className="size-[20px]">{isLiked ? icons.undo : icons.delete}</div>
                    }
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleLike();
                    }}
                />
            </div>
        </PostListView>
    );
}