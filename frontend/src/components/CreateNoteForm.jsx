// import libraries
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

function EmptyTextarea(prop) {
    const blue = {

    };

    const grey = {

    };
    function handleDetail(e) {
        console.log(e.target.value);
        prop.setDetail(e.target.value);
    }
    const StyledTextarea = styled(TextareaAutosize)(
        ({ theme }) => `
      min-width:99.5%;
      max-width: 100%;
      min-height: 21px;
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding-top: 12px;
      padding-bottom: 12px;
  
      border-radius: 12px 12px 0 12px;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0px 2px 24px ${theme.palette.mode === 'dark' ? blue[900] : blue[100]
            };
    
      &:hover {
        border-color: ${blue[400]};
      }
    
      &:focus {
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      }
    
      // firefox
      &:focus-visible {
        outline: 0;
      }
    `
    );

    return <StyledTextarea value={prop.value} aria-label="empty textarea" placeholder="Empty" onChange={handleDetail} autoFocus />;
}

const CreateNoteForm = () => {
    const dispatch = useDispatch()
    // state
    const [newNote, setNewNote] = useState('')
    // functions
    const handleAddNote = (event) => {
        event.preventDefault()
        dispatch({ type: "saga/addNote", payload: { content: newNote, important: true } })
        setNewNote('')
    }
    return (
        <div>
            <h2>Create a new note</h2>

            <form onSubmit={handleAddNote}>
                <TextareaAutosize
                    value={newNote}
                    onChange={(event) => {
                        setNewNote(event.target.value)
                    }}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}




export default CreateNoteForm