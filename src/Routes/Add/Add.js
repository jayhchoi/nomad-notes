import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Editor from '../../Components/Editor/Editor'

import { ADD_NOTE } from '../../queries'

export default class Add extends Component {
  render() {
    return (
      <Mutation mutation={ADD_NOTE}>
        {addNote => {
          this.addNote = addNote
          return <Editor onSave={this._onSave} />
        }}
      </Mutation>
    )
  }

  _onSave = (title, content) => {
    if (title !== '' && content !== '') {
      this.addNote({ variables: { title, content } })
      this.props.history.push('/')
    } else {
      throw new Error('Something went wrong!')
    }
  }
}
