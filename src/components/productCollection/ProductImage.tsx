import React from 'react'
import { Image, Typography } from 'antd'

interface PropsType {
  id: number | string
  title: string
  size: 'large' | 'small'
  price: number | string
  imageSrc: string
}

export const ProductImage: React.FC<PropsType> = ({ id, title, size, price, imageSrc }) => {
  return (
    <>
      {size === 'large' ? (
        <Image src={imageSrc} width={490} height={285} />
      ) : (
        <Image src={imageSrc} width={240} height={120} />
      )}
      <div>
        <Typography.Text type='secondary'>{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type='danger' strong>
          &yen; {price} 起
        </Typography.Text>
      </div>
    </>
  )
}
