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
                                workspace={false}
                            />
                        </Box>
                    )
                })}
            </Box>
        </>
    )
    return children
}

// import Box from "@mui/material/Box";
// import CircularProgress from '@mui/material/CircularProgress';
// import Typography from "@mui/material/Typography";
// import { useEffect, useState } from "react";
// import { getBoards } from '../services/boardServices';
// import { getWorkspaces } from "../services/workspaceServices";
// import Space from "./Space";


// export default function Spaces({ workspaceID = null }) {
//     const token = localStorage.getItem("token")
//     const url = !workspaceID ? '/workspaces' : '/boards'
//     const [content, setContent] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)

//     const children = (
//         <>
//             <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
//                 {content.map((data) => {
//                     return (
//                         <Box key={data.id} sx={{ display: "flex", padding: "2rem" }}>
//                             <Space title={data.title} background={data.background} url={`${url}/${data.documentId}`} />
//                         </Box>
//                     )
//                 })}
//             </Box>
//         </>
//     )

//     async function loadContent(workspaceID = null) {
//         setError(null)
//         try {
//             const response = !workspaceID ?
//                 await getWorkspaces(token) :
//                 await getBoards(token)
//             const data = await response.json()

//             if (!response.ok) {
//                 setError(data.error?.message || "Une erreur s'est produite, veuillez reessayer plus tard")
//                 setLoading(false)
//                 return
//             }
//             const toLoad = !workspaceID ?
//                 data.workspaces.reverse() :
//                 data.data.reverse()
//             setContent(toLoad)
//             setLoading(false)
//         } catch (err) {
//             setError("Impossible de joindre le serveur!")
//             console.error(err)
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         loadContent(workspaceID)
//     }, [workspaceID])

//     if (loading) return <Typography variant="h1"><CircularProgress /></Typography>
//     if (error) return <Typography variant="h4">{error}</Typography>
//     return children
// }