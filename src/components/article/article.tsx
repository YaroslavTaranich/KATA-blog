import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Navigate, useParams } from 'react-router-dom'

import ErrorMessage from '../errorMessage/errorMessge'
import TagList from '../UI/tagList/tagList'
import Like from '../like/like'
import Spinner from '../UI/spinner/spinner'
import UserInfo from '../userInfo/userInfo'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  getArticleBySlug,
  getArticlesInfo,
  getCurrentArticle,
  toggleFavoriteArticle,
} from '../../redux/slices/articlesSlice'
import { getUserData } from '../../redux/slices/userSlice'

import ArtileControls from './articleControls'
import styles from './article.module.css'

function Article() {
  const params = useParams()
  const dispatch = useAppDispatch()

  const article = useAppSelector(getCurrentArticle)
  const { status } = useAppSelector(getArticlesInfo)

  const { info, loadingInitial } = useAppSelector(getUserData)

  useEffect(() => {
    if (params.slug) dispatch(getArticleBySlug(params.slug))
  }, [params.slug])

  const likeHandler = () => dispatch(toggleFavoriteArticle({ slug: article.slug, isFavorite: article.favorited }))

  if (status === 'error') {
    return <ErrorMessage button="Go back">Failed to load an article!</ErrorMessage>
  }

  if (status === 'deleted') return <Navigate to="/" />

  if (article) {
    const { title, favoritesCount, author, createdAt, tagList, description, body, favorited, slug } = article
    return (
      <article className={styles.article}>
        <header className={styles.header}>
          <h5 className={styles.title}>{title}</h5>
          <Like count={favoritesCount} isFavorite={favorited} likeHandler={likeHandler} slug={slug} />
          <div className={styles.authtor}>
            <UserInfo user={author} createdAt={createdAt} />
          </div>
          {info && !loadingInitial && info.username === article.author.username && <ArtileControls status={status} />}
        </header>
        <TagList tags={tagList} />
        <p className={styles.shortText}>{description}</p>
        <section className={styles.markdown}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </section>
      </article>
    )
  }

  return <Spinner />
}

export default Article
