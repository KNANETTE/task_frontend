import BoardList from "./BoardList";

export default function BoardLists({ content, onDelete, onResult }) {
    return (
        <>
            {content.map(data => {
                return (
                    <BoardList key={data.id} content={data} onDelete={onDelete} onResult={onResult} />
                )
            })}
        </>
    )
}