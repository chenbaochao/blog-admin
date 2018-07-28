import React, { Component } from 'react'
import {
  Row,
  Col,
  Button,
  Input,
  message
} from 'antd'
import axios from 'axios'
class CatalogEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
      name: ''
    }
    this.getCatalogDesc = this.getCatalogDesc.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const catalogId = this.props.match.params.id
    this.getCatalogDesc(catalogId)
  }
  getCatalogDesc(id) {
    axios.get(`/admin/api/catalog/${id}`)
      .then(res => {
        if (res.status === 200 && res.data.code === 200) {
          this.setState({
            data: res.data.data,
            name: res.data.data.name
          })
        } else {
            message.error(res.data.msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  handleChange (event) {
    this.setState({
      name: event.target.value
    })
  }
  handleSubmit() {
    let params = {
      id: this.state.data.id,
      name: this.state.name,
      userId: this.state.data.userId,
      createDate: this.state.data.createDate,
      updateDate: this.state.data.updateDate
    }
    axios.put(`/admin/api/catalog/${params.id}`, params)
      .then(res => {
        if (res.status === 200 && res.data.code === 200) {
          message.success(res.data.msg)
          this.setState({
            data: ''
          })
            this.props.history.push(`/app/catalog/list`)

        } else {
          message.error(res.data.msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <Row type="flex" justify="center">
        <Col span={14}>
          <header className="new-catalog-header">
            <h1>更新分类</h1>
          </header>
          <div className="new-catalog-input">
            <Input
              addonBefore="分类名称" 
              size="large"
              placeholder=""
              name="name"
              value={this.state.name}
              onChange = {this.handleChange}
            />
          </div>
          <div className="new-catalog-input">
            <Button
              type="primary"
              size="large"
              icon="check-circle-o"
              style={{float: 'right'}}
              onClick={this.handleSubmit}
            >
              更新
            </Button>
          </div>
        </Col>
      </Row>
    )
  }
}

export default CatalogEdit