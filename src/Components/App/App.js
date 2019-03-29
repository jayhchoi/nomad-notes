import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Notes from '../../Routes/Notes/Notes'
import Note from '../../Routes/Note/Note'
import Edit from '../../Routes/Edit/Edit'
import Add from '../../Routes/Add/Add'

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={Notes} />
            <Route exact path="/add" component={Add} />
            <Route exact path="/note/:id" component={Note} />
            <Route exact path="/note/:id/edit" component={Edit} />
          </Switch>
        </Router>
      </>
    )
  }
}

export default App
