import React, { FC, useState, useEffect} from 'react'
import axios from 'axios'
import { Intent, Spinner, ButtonGroup, Button, Icon } from "@blueprintjs/core";
import linkParse, { TPagination} from '../utils/linkParse'

interface IProps {
 login?: string
}

type TDataItem = { id: number, login: string, avatar_url: string, type: string}
interface IResults {
  data?: { items: Array<TDataItem>}
  pagination?: TPagination
  error?: string
  loading: boolean
}

const SearchResult: FC<IProps> = ({login}) => {
  const [results, changeResults] = useState<IResults>({ loading: false })
  const [page, changePage] = useState<{ page: number, link?: string }>({ page: 1 })
  useEffect(() => {
    if (login) {
      changeResults({loading: true})
      axios.get(page.link ?? `https://api.github.com/search/users?q=${login}+in%3Alogin&per_page=9&page=1`)
      .then(response => {
        return changeResults({
          data: response.data,
          pagination: linkParse(response.headers.link),
          loading: false })
      })
      .catch(error => changeResults({error, loading: false}))
    }
  }, [page.link, login])

  const { loading, data, pagination} = results
  if (loading) return (<Spinner className="spinner" size={100} intent={Intent.PRIMARY} />)
  if (data) return (
    <>
      <div className="cards">
        {data.items.map((item: TDataItem) => (
          <div key={item.id} className="card">
            <img className="avatar" src={item.avatar_url} alt={item.login} />
            <span>{item.login}</span>
            <span>{item.type}</span>
          </div>
          )
        )}
      </div>
      {pagination && <ButtonGroup className="pagination">
        {pagination.first && pagination.prev!.page !== pagination.first.page && <Button
          onClick={() => changePage({ page: pagination.first!.page, link: pagination.first!.link })}
          text={<Icon icon="double-chevron-left" iconSize={18} intent={Intent.PRIMARY} />}
        />}
        {pagination.prev && <Button
          onClick={() => changePage({ page: pagination.prev!.page, link: pagination.prev!.link })}
          text={<Icon icon="chevron-left" iconSize={18} intent={Intent.PRIMARY} />}
        />}
        {page.page && <Button disabled>{page.page}</Button>}
        {pagination.next && <Button
          onClick={() => changePage({ page: pagination.next!.page, link: pagination.next!.link })}
          text={<Icon icon="chevron-right" iconSize={18} intent={Intent.PRIMARY} />}
        />}
        {pagination.last && pagination.next!.page !== pagination.last.page && <Button
          onClick={() => changePage({ page: pagination.last!.page, link: pagination.last!.link })}
          text={<Icon icon="double-chevron-right" iconSize={18} intent={Intent.PRIMARY} />}
        />}
      </ButtonGroup>
      }
    </>
  )
  return <div className="error">{results.error}</div>
}

export default SearchResult