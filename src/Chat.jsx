import React, { Component } from 'react';
import {connect} from 'react-redux';
import { addName } from './actions/action'

class Chat extends Component {

    render() {
      console.log(this.props)
      console.log(this.state)
      return (
        <div>
            <h3>Chat</h3>
            <hr/>
            <form onSubmit={e => {
              var input = this.refs.imput
              e.preventDefault()
              if (!input.value.trim()) {
                return
              }
              addName(input.value)
            }}>
              <input ref="imput"/>
              <button type="submit">
                add new
              </button>
            </form>
            {this.props.names.map(u => {
              return <p key={u}>{u}</p>
            })}
        </div>
      );
    }
  }
  const mapStateToProps = (state) => ({
    names: state.names
  })
  const mapDispatchToProps = (dispatch) => {
    return {
      addName: (text) => {
        dispatch(addName(text))
      }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps) (Chat);