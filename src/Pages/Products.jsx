import React, { Suspense } from 'react'
import UseInfiniteProducts from '../utils/UseInfiniteProducts'
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductTemplate from '../components/ProductTemplate';

const Products = () => {

    const { products, hasMore, fetchProducts } = UseInfiniteProducts();
    console.log(products.length)
    return (
        <InfiniteScroll
            className='overflow-x-hidden min-h-[100vh] relative z-21'
            dataLength={products.length}
            next={fetchProducts}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! you have  seen it all</b>
                </p>
            }
        >
            <div className='flex flex-wrap'>
                {products.map((product) => {
                    return <Suspense
                        key={product.id}
                        fallback={
                            <h1 className='text-center text-6xl text-yellow-300'>Loading...</h1>
                        }>
                        <ProductTemplate product={product} />
                    </Suspense>
                })}
            </div>
        </InfiniteScroll>
    )
}

export default Products 