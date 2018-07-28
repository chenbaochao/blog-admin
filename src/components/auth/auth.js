import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

@withRouter
class Auth extends Component {
  componentDidMount() {
    const routePath = ['/login']
    const currentPath = this.props.location.pathname
    if (routePath.indexOf[currentPath] > -1) {
      return null
    }
    setTimeout(() => {
      let tokenJSON = sessionStorage.getItem('token');
      let expires_in;
      if(tokenJSON!=null){
        let token = JSON.parse(tokenJSON);
        expires_in  = token.expires_in;
      }
     console.log(expires_in);
      if (tokenJSON==null||expires_in<=0) {
        this.props.history.push('/login')
      }
    }, 0)
  }
  render() {
    return (
      <div>
      </div>
    )
  }
}

export default Auth;