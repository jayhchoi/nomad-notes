import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { GET_NOTES } from '../../queries'

const Header = styled.div`
  margin-bottom: 50px;
`

const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`

const Button = styled.div`
  margin-left: 10px;
  transform: scale(0.8);
  background-color: #eee;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
`

const Subtitle = styled.h2`
  color: #a2a19e;
  font-weight: 400;
`

const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Note = styled.div`
  padding: 10px;
  padding-left: 5px;
  transition: background-color 0.1s linear;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;

  &:hover {
    background-color: #eeeeee;
  }
`

const CustomLink = styled(Link)`
  &:visited,
  &:link {
    text-decoration: none;
  }
`

const NoteTitle = styled.span`
  padding-bottom: 5px;
  font-weight: 600;
  font-size: 20px;
`

export default class Notes extends Component {
  render() {
    return (
      <Fragment>
        <Header>
          <Title>
            Nomad Notes
            <CustomLink to="/add">
              <Button>
                <i className="fas fa-pencil-alt" />
              </Button>
            </CustomLink>
          </Title>
          <Subtitle>Taking notes while we learn</Subtitle>
        </Header>
        <Query query={GET_NOTES}>
          {({ loading, data }) => {
            if (loading || !data) return <p>Loading...</p>
            return data.notes.map(note => (
              <CustomLink to={`/note/${note.id}`} key={note.id}>
                <Note>{note.title}</Note>
              </CustomLink>
            ))
          }}
        </Query>
      </Fragment>
    )
  }
}
