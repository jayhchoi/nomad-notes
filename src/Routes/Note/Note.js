import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import MarkdownRenderer from 'react-markdown-renderer'

import { GET_NOTE } from '../../queries'

const TitleComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
`

const Title = styled.h1`
  font-size: 50px;
  margin: 0;
  padding: 0;
`

const CustomLink = styled(Link)`
  color: blueviolet;

  &:visited,
  &:link {
    text-decoration: none;
  }
`

const Button = styled.button``

export default class Note extends Component {
  render() {
    return (
      <Query query={GET_NOTE} variables={{ id: this.props.match.params.id }}>
        {({ loading, data }) => {
          if (loading || !data) return <p>Loading...</p>

          return (
            <>
              <TitleComponent>
                <Title>{data.note.title}</Title>
                <CustomLink to={`/note/${data.note.id}/edit`}>
                  <Button>Edit</Button>
                </CustomLink>
              </TitleComponent>
              <MarkdownRenderer markdown={data.note.content} />
            </>
          )
        }}
      </Query>
    )
  }
}
