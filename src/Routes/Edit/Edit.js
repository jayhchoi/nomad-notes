import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { GET_NOTE, EDIT_NOTE } from '../../queries'

import Editor from '../../Components/Editor/Editor'

export default class Edit extends Component {
  render() {
    return (
      <Query query={GET_NOTE} variables={{ id: this.props.match.params.id }}>
        {({ loading, data }) => {
          if (loading || !data) return <p>Loading...</p>

          const { id, title, content } = data.note

          return (
            <Mutation mutation={EDIT_NOTE} variables={{ id, title, content }}>
              {editNote => {
                this.editNote = editNote

                return (
                  <Editor
                    title={title}
                    content={content}
                    id={id}
                    onSave={this._onSave}
                  />
                )
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }

  _onSave = (title, content, id) => {
    if (title !== '' && content !== '' && id) {
      this.editNote({ variables: { title, content, id } })
      this.props.history.push(`/note/${id}`)
    }
  }
}
