import { NOTE_FRAGMENT } from './fragments'
import { GET_NOTES } from './queries'
import { saveNotes, fetchNotes } from './localStorage'

export const defaults = {
  notes: fetchNotes()
}

export const resolvers = {
  Query: {
    note(_, args, { cache }, info) {
      const id = cache.config.dataIdFromObject({
        __typename: 'Note',
        id: args.id
      })
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id })
      return note
    }
  },
  Mutation: {
    addNote(_, args, { cache }, info) {
      const { notes } = cache.readQuery({ query: GET_NOTES })
      const newNote = {
        __typename: 'Note',
        id: notes.length + 1,
        title: args.title,
        content: args.content
      }
      cache.writeData({
        data: {
          notes: [newNote, ...notes]
        }
      })
      // Save locally
      const { notes: newNotes } = cache.readQuery({ query: GET_NOTES })
      saveNotes(newNotes)
      return newNote
    },
    editNote(_, { id, title, content }, { cache }, info) {
      const noteId = cache.config.dataIdFromObject({
        __typename: 'Note',
        id
      })
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id: noteId })
      const updatedNote = {
        ...note
      }
      if (title) updatedNote.title = title
      if (content) updatedNote.content = content
      cache.writeFragment({
        id: noteId,
        fragment: NOTE_FRAGMENT,
        data: updatedNote
      })
      // Save locally
      const { notes: newNotes } = cache.readQuery({ query: GET_NOTES })
      saveNotes(newNotes)
      return updatedNote
    }
  }
}
