import { Link, useNavigate } from 'react-router-dom';
import { formatCount, formatDateRelative } from '../../Utils';
import { Button } from '..';
import { icons } from '../../Assets/icons';

export default function PostCardView({
    post,
    reference,
    showOwnerInfo = false,
    children,
}) {
    const {
        post_id,
        category_name,
        post_image,
        post_content,
        totalViews,
        post_title,
        post_createdAt,
        userName,
        firstName,
        lastName,
        avatar,
    } = post;

    const navigate = useNavigate();

    return (
        <div
            ref={reference}
            onClick={() => navigate(`/post/${post_id}`)}
            className="min-w-[350px] mb-6 flex flex-col items-start justify-center gap-6 relative cursor-pointer w-full p-4 bg-white drop-shadow-md rounded-2xl overflow-hidden"
        >
            {/* post image */}
            <div className="h-[250px] drop-shadow-md w-full rounded-xl overflow-hidden">
                <img
                    alt="post image"
                    src={post_image}
                    className="h-full object-cover w-full"
                />
            </div>

            <div className="w-full">
                <div className="flex items-start justify-between w-full">
                    {/* post category */}
                    <div className="hover:cursor-text flex items-center justify-center gap-2 bg-[#ffffff] drop-shadow-md rounded-full w-fit px-3 py-[2px]">
                        <div className="size-[9px] fill-[#2556d1]">
                            {icons.dot}
                        </div>
                        <span className="text-[#2556d1]">
                            {category_name.toUpperCase()}
                        </span>
                    </div>

                    {/* statistics */}
                    <div className="hover:cursor-text text-[15px] text-[#5a5a5a]">
                        {formatCount(totalViews)} views &bull; posted
                        {' ' + formatDateRelative(post_createdAt)}
                    </div>
                </div>

                {/* post title */}
                <div className="w-fit hover:cursor-text text-2xl font-medium text-black text-ellipsis line-clamp-1 mt-4">
                    {post_title}
                </div>

                {/* post content */}
                <div className="hover:cursor-text text-[17px] text-black text-ellipsis line-clamp-1 mb-5 mt-2">
                    {post_content}
                </div>

                {/* show owner info if home page */}
                {showOwnerInfo && (
                    <Link
                        to={`/channel/${userName}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-start justify-start gap-3"
                    >
                        {/* avatar */}
                        <div className='drop-shadow-md'>
                            <div className="size-[50px]">
                                <img
                                    alt="post owner avatar"
                                    src={avatar}
                                    className="size-full rounded-full hover:brightness-90"
                                />
                            </div>
                        </div>

                        {/* channel info */}
                        <div className="">
                            <div className="text-ellipsis line-clamp-1 text-[18px] hover:text-[#5c5c5c] font-medium text-black w-fit">
                                {firstName} {lastName}
                            </div>

                            <div className="text-black hover:text-[#5c5c5c] text-[16px] w-fit">
                                @{userName}
                            </div>
                        </div>
                    </Link>
                )}

                <div className="w-full flex items-center justify-end text-white ">
                    <Button
                        btnText={
                            <div className="flex items-center justify-center gap-3">
                                <span>Read more</span>
                                <div className="size-[20px] fill-white">
                                    {icons.rightArrow}
                                </div>
                            </div>
                        }
                        onClick={() => navigate(`/post/${post_id}`)}
                        className="rounded-md p-2 px-3 bg-[#4977ec] hover:bg-[#3b62c2]"
                    />
                </div>
            </div>

            {children}
        </div>
    );
}
