import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Spin } from 'antd'
import { Header, Footer, FilterArea, ProductList } from '../../components'
import styles from './SearchPage.module.css'
import { searchProduct } from '../../redux/productSearch/slice'
import { useSelector } from '../../redux/hooks'

interface MatchParams {
  keywords: string
}

export const SearchPage: React.FC = () => {
  const { keywords } = useParams<MatchParams>()
  const loading = useSelector(state => state.productSearch.loading)
  const productList = useSelector(state => state.productSearch.data)
  const pagination = useSelector(state => state.productSearch.pagination)
  const error = useSelector(state => state.productSearch.error)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      searchProduct({
        keywords,
        nextPage: 1,
        pageSize: 2,
      }),
    )
  }, [keywords, dispatch])

  const onPageChange = (nextPage, pageSize) => {
    dispatch(searchProduct({ nextPage, pageSize, keywords }))
  }

  if (loading) {
    return (
      <Spin
        size='large'
        style={{
          margin: '50vh auto',
          width: '100%',
        }}
      />
    )
  }
  if (error) {
    return <div>网站出错：{error}</div>
  }

  return (
    <>
      <Header />
      <div className={styles['page-content']}>
        {/* 分类过滤器 */}
        <div className={styles['product-list-container']}>
          <FilterArea />
        </div>
        {/* 产品列表 */}
        <div className={styles['product-list-container']}>
          <ProductList data={productList} paging={pagination} onPageChange={onPageChange} />
        </div>
      </div>
      <Footer />
    </>
  )
}
