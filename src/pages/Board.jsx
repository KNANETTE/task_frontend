import { DndContext, PointerSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BoardList from "../components/BoardList";
import BoardModal from "../components/BoardModal";
import CreateList from "../components/CreateList";
import Navbar from "../components/Navbar";
import NotificationToast from "../components/NotificationToast";
import { updateCard } from "../services/cardServices";
import { getLists, updateList } from "../services/listServices";

export default function Board() {
    const { bid } = useParams()
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(true)
    const [board, setBoard] = useState(null)
    const [lists, setLists] = useState([])
    const [active, setActive] = useState(null)
    const [toast, setToast] = useState({
        show: false,
        message: "",
        success: false,
    })
    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

    const handleClose = () => { setToast({ ...toast, show: false }) }

    const handleToast = ({ success, message }) => {
        setToast({
            show: true,
            message,
            success,
        })
    }

    const updateListState = (listId, newCards) => {
        setLists(prevLists =>
            prevLists.map(list =>
                list.id === listId ? { ...list, cards: newCards } : list
            )
        )
    }

    const handleListReorder = async (newList) => {
        const reordered = newList.map((list, order) => ({ ...list, order }))
        const previous = [...lists]
        setLists(reordered)

        try {
            await Promise.all(
                reordered.map(list => updateList(
                    token,
                    list.documentId,
                    JSON.stringify({ data: { order: list.order } })
                ))
            )
        } catch (error) {
            console.error(error)
            setLists(previous)
            handleToast({ success: false, message: "Erreur" })
        }
    }

    const handleCardReorder = async (newCards, list) => {
        const reordered = newCards.map((card, order) => ({ ...card, order }))
        updateListState(list.id, reordered)
        try {
            await Promise.all(
                reordered.map(card => updateCard(
                    token,
                    card.documentId,
                    JSON.stringify({ data: { order: card.order } })))
            )
        } catch (error) {
            console.error(error)
            onResult({ success: false, message: "Erreur" })
        }
    }

    const moveCardToAnotherList = async (activeId, sourceList, targetList) => {
        const card = sourceList.cards.find(card => card.id == activeId)

        const newSourceList = sourceList.cards
            .filter(card => card.id != activeId)
            .map((card, order) => ({ ...card, order }))

        const newTargetList = [...targetList.cards, card]
            .map((card, order) => ({ ...card, order }))

        const data = JSON.stringify({
            data: {
                list: targetList.documentId,
                order: newTargetList.length - 1
            }
        })

        updateListState(sourceList.id, newSourceList)
        updateListState(targetList.id, newTargetList)

        try {
            const resp = await updateCard(token, card.documentId, data)
            if (!resp.ok) {
                console.error(error)
                handleToast({ success: false, message: "Erreur" })
            }
        } catch (error) {
            console.error(error)
            handleToast({ success: false, message: 'Erreur' })
        }
    }

    const handleListDrag = (activeId, overId) => {
        activeId = activeId.replace("list-", "")
        overId = overId.replace("list-", "")
        const oldIndex = lists.findIndex(list => list.order == activeId)
        const newIndex = lists.findIndex(list => list.order == overId)
        handleListReorder(arrayMove(lists, oldIndex, newIndex))
    }

    const handleCardDrag = (activeId, overId) => {
        const sourceList = lists.find(list => list.cards.some(card => card.id == activeId))
        let targetList = lists.find(list => list.cards.some(card => card.id == overId))

        if (!sourceList || !targetList) return
        if (!targetList && overId.startsWith("list-")) {
            const listOrder = Number(overId.replace("list-", ""))
            targetList = lists.find(list => list.order === listOrder)
        }
        if (sourceList.id !== targetList.id)
            moveCardToAnotherList(activeId, sourceList, targetList)
        else {
            const oldIndex = sourceList.cards.findIndex(card => card.id == activeId)
            const newIndex = sourceList.cards.findIndex(card => card.id == overId)

            const newCards = arrayMove(sourceList.cards, oldIndex, newIndex)
            handleCardReorder(newCards, sourceList)
        }
    }

    const handleDragStart = (event) => {
        const { active } = event
        const id = `${active.id}`

        if (id.startsWith("list-")) setActive({ type: "list", id })
        else setActive({ type: "card", id })
    }

    const handleDragOver = (event) => {
        const { active, over } = event
        if (!over) return

        const activeId = `${active.id}`
        const overId = `${over.id}`

        if (activeId.startsWith("list-")) return

        const sourceList = lists.find(list => list.cards.some(card => card.id == activeId))
        let targetList = lists.find(list => list.cards.some(card => card.id == overId))
        if (!targetList && overId.startsWith("list-")) {
            const listOrder = Number(overId.replace("list-", ""))
            targetList = lists.find(list => list.order === listOrder)
        }

        if (!sourceList || !targetList || sourceList.id === targetList.id) return;

        moveCardToAnotherList(activeId, sourceList, targetList)
    }

    const handleDragEnd = (event) => {
        const { active, over } = event
        if (!over) {
            setActive(null)
            return
        }

        const activeId = `${active.id}`
        const overId = `${over.id}`

        if (activeId.startsWith("list-") && overId.startsWith("list-")) {
            handleListDrag(activeId, overId)
            setActive(null)
            return
        }

        if (!activeId.startsWith("list-") && !overId.startsWith("list-")) {
            const sourceList = lists.find(list => list.cards.some(card => card.id == activeId))
            let targetList = lists.find(list => list.cards.some(card => card.id == overId))
            if (!targetList && overId.startsWith("list-")) {
                const listOrder = Number(overId.replace("list-", ""))
                targetList = lists.find(list => list.order === listOrder)
            }

            if (!sourceList || !targetList) {
                setActive(null)
                return
            }

            if (sourceList.id === targetList.id) {
                const oldIndex = sourceList.cards.findIndex(card => card.id == activeId)
                const newIndex = sourceList.cards.findIndex(card => card.id == overId)

                const newCards = arrayMove(sourceList.cards, oldIndex, newIndex)
                handleCardReorder(newCards, sourceList)
            }
        }

        setActive(null)
    }

    async function fetchBoard() {
        try {
            const res = await getLists(token, bid)
            const resData = await res.json()
            setLoading(false)

            if (!res.ok) {
                handleToast({ success: false, message: "Erreur client/serveur" })
                console.error(res)
                return
            }

            setBoard(resData.data)
            setLists(resData.data.lists)
        } catch (error) {
            handleToast({ success: false, message: "Problème de connexion!" })
            console.error(error)
            setLoading(false)
        }
    }

    useEffect(() => { fetchBoard() }, [bid, token])


    if (loading) return <CircularProgress />
    return (
        <>
            <Navbar />
            <Box sx={{ background: board.background, color: "#363636", p: 3 }}>
                <Toolbar sx={{ margin: "0.5rem" }} />
                <Box className="d-flex justify-content-evenly m-2">
                    <Typography variant="h3">{board.title}</Typography>
                    <BoardModal content={board} onCreated={fetchBoard} onResult={handleToast} />
                </Box>
                <Typography>{board.description}</Typography>
            </Box>
            <Divider />
            <Box className="horizontal-scrollbar h-100">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={lists.map(list => `list-${list.order}`)} strategy={horizontalListSortingStrategy}>
                        {lists.map(list => <BoardList key={list.id} list={list} cards={list.cards} onRequest={fetchBoard} onResult={handleToast} />)}
                    </SortableContext>
                </DndContext>
                <CreateList order={lists.length} onCreated={fetchBoard} onResult={handleToast} />
            </Box>
            <NotificationToast show={toast.show} message={toast.message} success={toast.success} onCLose={handleClose} />
        </>
    )
}
