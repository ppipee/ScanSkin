import React, { Component } from 'react'
import Action from '../../action'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class SideBar extends Component {
  constructor() {
    super()
    this.state = {}
  }

  removeProduct = e => {
    let select_product = [...this.props.getProducts]
    console.log(e.target.getAttribute('index'))
    let index = e.target.getAttribute('index')
    select_product.splice(index, 1)
    select_product.map((item, count) => (item.index = count))
    this.props.setProduct(select_product)
  }

  productsTable = () => {
    let myProducts = this.props.getProducts
    let table = []
    myProducts.forEach(product => {
      let { id, img, name, index } = product
      table.push(
        <div className="my-products" key={id}>
          <img src={img} alt={name} />
          <span>{name}</span>
          <button
            className="remove-product"
            index={index}
            onClick={this.removeProduct.bind(this)}
          >
            X
          </button>
        </div>
      )
    })
    return table
  }

  compare = () => {
    if (this.props.getProducts.length >= 2) {
      return (
        <Link to="./Compare">
          <span>Compare</span>
        </Link>
      )
    } else return <span>Compare</span>
  }

  render() {
    return (
      <div className="side-bar-container">
        <div className="how-to">howto</div>
        <div className="number">{this.props.getProducts.length}/4</div>
        <div className="side-bar-title">
          {this.props.getProductsType.toUpperCase()}
        </div>
        {this.productsTable()}
        <div className="compare-product-btn">{this.compare()}</div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setProduct: products => dispatch({ type: Action.SELECTPRODUCT, products })
})
const mapStateToProps = state => ({
  getProductsType: state.compare.select_product_type,
  getProducts: state.select.products
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar)
