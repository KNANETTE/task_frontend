import Box from "@mui/material/Box";
import Space from "./Space";


export default function Spaces({ content, onDelete, onResult, workspace = null }) {
    const children = (
        <>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                {content.map((data) => {
                    const url = !workspace ? `/${data.documentId}` : `${workspace}/${data.documentId}`
                    return (
                        <Box key={data.id} sx={{ display: "flex", padding: "2rem" }}>
                            <Space
                                content={data}
                                url={url}
                                onDelete={onDelete}
                                onResult={onResult}
                                workspace={!workspace ? true : false}
                            />
                        </Box>
                    )
                })}
            </Box>
        </>
    )
    return children
}
