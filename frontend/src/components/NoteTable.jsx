// import libraries
import { useDispatch, useSelector } from "react-redux"
// import component
import NoteRow from "./NoteRow"
const NoteTable = () => {
    const notesToShow = useSelector(state => {
        if (state.filter == "ALL") {
            return state.notes
        }
        return state.filter == "IMPORTANT"
            ? state.notes.filter(note => note.important == true)
            : state.notes.filter(note => note.important == false)
    })
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Note ID</th>
                        <th>Content</th>
                        <th>Important</th>
                        <th>Date</th>
                        <th>Username</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {notesToShow.map(note => (
                        <NoteRow key={note.id} note={note}></NoteRow>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default NoteTable