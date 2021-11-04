import React from 'react'
import { Comment, List } from 'antd'

interface CommentProps {
  author: string
  avatar: string
  content: string
  createDate: string
}

interface PropsType {
  data: CommentProps[]
}

export const ProductComments: React.FC<PropsType> = ({ data }) => {
  return (
    <List
      dataSource={data}
      itemLayout='horizontal'
      renderItem={item => {
        return (
          <li>
            <Comment author={item.author} avatar={item.avatar} content={item.content} />
          </li>
        )
      }}
    ></List>
  )
}
