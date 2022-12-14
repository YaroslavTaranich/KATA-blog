export interface IAuthtor {
  username: string
  image: string
  following: boolean
}

export interface IArticle {
  slug: string
  title: string
  description: string
  body: string
  createdAt: Date
  updatedAt: Date
  tagList: string[]
  favorited: boolean
  favoritesCount: number
  author: IAuthtor
}

export type IArticleFormData = {
  title: string
  description: string
  body: string
  tagList: { value: string }[]
}

export type IArticlePostData = {
  title: string
  description: string
  body: string
  tagList: string[]
}
