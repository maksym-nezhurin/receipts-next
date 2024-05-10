export const Comment = (props: any) => {
    const { comment } = props;
    return (
        <div className="py-3 px-2 bg-teal-500 border-1 rounded-xl text-green-800 flex flex-col">
            <div className="text-right text-amber-200">Comment from: {comment.user?.name}</div>
            <div className="text-left text-white">{comment.content}</div>
        </div>
    )
}