import React from 'react'
import CollectionAtelier from './CollectionAtelier'
import CoffeCup3D from './CoffeeCup3D'

const Categories = () => {
    return (
        <div className='relative'>

            <div >
                <CollectionAtelier />
                <CollectionAtelier />
                <CollectionAtelier />
                <CollectionAtelier />
            </div>

            <div className='absolute top-0 left-1/2 -translate-x-1/2 '>
                <CoffeCup3D />
            </div>
        </div>
    )
}

export default Categories