export const saveNotes = notes => {
  try {
    localStorage.setItem('notes', JSON.stringify(notes))
  } catch (error) {
    console.log(error)
  }
}

export const fetchNotes = () => {
  try {
    return JSON.parse(localStorage.getItem('notes')) || []
  } catch (error) {
    console.log(error)
  }
}
